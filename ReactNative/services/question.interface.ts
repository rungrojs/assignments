import { QuestionModel } from "../models/question.model";
import { RankingModel } from "../models/ranking.model";
import UserAnswer from "../models/user-answer.model";

export interface IQuestionService {
    getQuestions(): Promise<Array<QuestionModel>>
    submitAnswerAndGetLeaderboard(userName: string, answers: UserAnswer[]): Promise<RankingModel>
}
