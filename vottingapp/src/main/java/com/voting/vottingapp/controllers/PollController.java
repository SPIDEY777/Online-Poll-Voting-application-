package com.voting.vottingapp.controllers;


import com.voting.vottingapp.Services.PollService;
import com.voting.vottingapp.model.Poll;
import com.voting.vottingapp.repositories.PollRepository;
import com.voting.vottingapp.request.Vote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/polls")
@CrossOrigin(origins = "http://localhost:4200/")
public class PollController {
    private PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @PostMapping
    public Poll createPoll(@RequestBody Poll poll) {
        return pollService.createPoll(poll);

    }
    @GetMapping
    public List<Poll> getAllPolls() {
        return  pollService.getAllPolls();

    }

    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPollById(@PathVariable Long id) {
         return pollService.getPollById(id)
                 .map(ResponseEntity::ok)
                 .orElse(ResponseEntity.notFound().build());


    }



@PostMapping("/vote")
public void vote(@RequestBody Vote vote){

    pollService.
            vote(vote.getPollId(),
                    vote.getOptionIndex().intValue());

}

}
