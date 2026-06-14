package com.voting.vottingapp.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Vote {
    private Long pollId;
    private Long optionIndex;

    public Vote(Long PollId, Long OptionIndex) {}
}

