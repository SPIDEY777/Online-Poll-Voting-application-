export interface OptionVote {
    Optiontext: string;
    votes: number;
}


export interface Poll {
    id: number;
    question: string;
    options: OptionVote[];
}
