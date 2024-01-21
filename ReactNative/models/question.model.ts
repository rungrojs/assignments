
export interface QuestionModel {
    selectedAnswer?: number
    id: number;
    text: string;
    answers: Answer[];
}

export interface Answer {
    id: number;
    text: string;
    correct: boolean;
}
