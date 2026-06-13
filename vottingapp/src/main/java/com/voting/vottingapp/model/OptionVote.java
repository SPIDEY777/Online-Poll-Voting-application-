package com.voting.vottingapp.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
    @NoArgsConstructor
@Embeddable
public class OptionVote {
    private String voteOption;
    private long voteCount = 0L;

}
