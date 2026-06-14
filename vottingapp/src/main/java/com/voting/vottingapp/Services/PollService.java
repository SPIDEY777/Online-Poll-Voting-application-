package com.voting.vottingapp.Services;

import com.voting.vottingapp.model.OptionVote;
import com.voting.vottingapp.model.Poll;
import org.apache.coyote.Response;
import org.aspectj.weaver.loadtime.Options;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.voting.vottingapp.repositories.PollRepository;
import org.springframework.web.bind.annotation.RequestParam;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class PollService {

    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();

    }

    public Optional<Poll> getPollById(Long id) {
        return pollRepository.findById(id);
    }

    public void vote(Long pollId, int optionIndex) {
        // 1. Get poll from DB
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException("Poll not found"));

        // 2. Get all options
        List<OptionVote> options = poll.getOptions();

        // 3. If index for vote is not valid, throw error and stop
        if (optionIndex < 0 || optionIndex >= options.size()) {
            throw new IllegalArgumentException("Invalid option index");
        }

        // 4. If we made it down here, the index is valid! Record the vote.
        OptionVote selectedOption = options.get(optionIndex);
        selectedOption.setVoteCount(selectedOption.getVoteCount() + 1);
        pollRepository.save(poll);
    }

    }

