import { QuestionModel } from "../models/question.model";
import seedrandom from "seedrandom";
import { RankingModel } from "../models/ranking.model";
import UserAnswer from "../models/user-answer.model";
import { IQuestionService } from "./question.interface";
import { TOKENS, container } from "./service-container";


export class QuestionService implements IQuestionService {

    // simulate server shuffer question
    private getRandomItems(array: any[], numberOfItems: number) {
        // Ensure numberOfItems is not greater than the array length
        numberOfItems = Math.min(numberOfItems, array.length);
        // Set the seed for randomness
        const rng = seedrandom((Math.floor(new Date().getTime() / 1000)).toString());
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0, numberOfItems);
    }

    async getQuestions(): Promise<QuestionModel[]> {
        return new Promise<QuestionModel[]>(resolve => {
            setTimeout(() => {
                let questionDatas = require('../resources/data/question.data.json');
                questionDatas = JSON.parse(JSON.stringify(questionDatas))
                questionDatas = this.getRandomItems(questionDatas, 20)
                const data: QuestionModel[] = questionDatas;
                resolve(data);
            }, 100);
        }).catch(error => {
            console.error('Error fetching questions:', error);
            throw error; // Propagate the error for handling in the calling code
        });
    }

    async submitAnswerAndGetLeaderboard(userName: string, answers: UserAnswer[]): Promise<RankingModel> {
        return new Promise<RankingModel>(resolve => {
            let leaderboardService = container.get(TOKENS.leaderboardService);
            let questionDatas = require('../resources/data/question.data.json') as QuestionModel[];
            let mapQuestion = new Map<number, QuestionModel>();
            let totalScore = 0;

            // should calculate with server side
            questionDatas.forEach(t => mapQuestion.set(t.id, t))
            answers.forEach(t => {
                var correct = mapQuestion.get(t.id)?.answers.some((v) => { return v.correct && v.id == t.selectedAnswer });
                if (correct) {
                    totalScore++;
                }
            });
            leaderboardService.addNewScore({
                name: userName,
                score: totalScore
            }).then(t => {
                resolve(t);
            });
        });
    }
}

