import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { finalize, timeout } from 'rxjs';
import { PollService } from '../poll.service';
import { Poll } from '../poll.models';

function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  return typeof value === 'string' && value.trim().length === 0 ? { whitespace: true } : null;
}

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css',
})
export class PollComponent implements OnInit {
  polls: Poll[] = [];
  isLoading = false;
  isCreating = false;
  errorMessage = '';
  createSuccessMessage = '';
  createErrorMessage = '';
  apiUrl = '/api/polls';
  private formBuilder = inject(FormBuilder);
  pollForm = this.formBuilder.nonNullable.group({
    question: ['', [Validators.required, noWhitespaceValidator]],
    options: this.formBuilder.array([
      this.createOptionControl(),
      this.createOptionControl(),
    ], [Validators.minLength(2)]),
  });

  constructor(private pollService: PollService) {}

  get options(): FormArray {
    return this.pollForm.controls.options;
  }

  ngOnInit(): void {
    this.loadPolls();
  }

  addOption(): void {
    this.options.push(this.createOptionControl());
  }

  removeOption(index: number): void {
    if (this.options.length <= 2) {
      return;
    }

    this.options.removeAt(index);
    this.options.markAsDirty();
  }

  createPoll(): void {
    this.createSuccessMessage = '';
    this.createErrorMessage = '';

    if (this.pollForm.invalid) {
      this.pollForm.markAllAsTouched();
      return;
    }

    const formValue = this.pollForm.getRawValue();
    const poll: Poll = {
      question: formValue.question.trim(),
      options: formValue.options.map((option) => ({
        voteOption: option.trim(),
        voteCount: 0,
      })),
    };

    this.isCreating = true;

    this.pollService.createPoll(poll).pipe(
      finalize(() => {
        this.isCreating = false;
      })
    ).subscribe({
      next: () => {
        this.createSuccessMessage = 'Poll created successfully.';
        this.resetCreateForm();
        this.loadPolls();
      },
      error: (err) => {
        console.error('Error creating poll', err);
        this.createErrorMessage = 'Unable to create poll. Please try again.';
      },
    });
  }

  loadPolls(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.pollService.getPolls().pipe(
      timeout(10000),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data) => {
        this.polls = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Error loading polls', err);
        this.polls = [];
        this.errorMessage = 'Unable to load polls. Please make sure the backend is running on localhost:8080 and restart Angular with npm start.';
      },
    });
  }

  vote(pollId: number | undefined, optionIndex: number): void {
    if (pollId === undefined) {
      return;
    }

    this.errorMessage = '';

    this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => this.loadPolls(),
      error: (err) => {
        console.error('Error submitting vote', err);
        this.errorMessage = 'Unable to submit vote. Please try again.';
      },
    });
  }

  private createOptionControl(value = '') {
    return this.formBuilder.nonNullable.control(value, [Validators.required, noWhitespaceValidator]);
  }

  private resetCreateForm(): void {
    while (this.options.length > 0) {
      this.options.removeAt(0);
    }

    this.options.push(this.createOptionControl());
    this.options.push(this.createOptionControl());
    this.pollForm.reset({ question: '', options: ['', ''] });
    this.pollForm.markAsPristine();
    this.pollForm.markAsUntouched();
  }
}
