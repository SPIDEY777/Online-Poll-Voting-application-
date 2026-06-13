package com.voting.vottingapp.Services;

import com.voting.vottingapp.model.Poll;
import org.springframework.stereotype.Service;
import com.voting.vottingapp.repositories.PollRepository;

@Service
public class PollService {

    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public  Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }
}
