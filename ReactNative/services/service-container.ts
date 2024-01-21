import { token, Container } from 'brandi';
import { IQuestionService } from './question.interface';
import { ILeaderboardService } from './leaderboard.interface';

const container = new Container();

export const TOKENS = {
    questionService: token<IQuestionService>('QuestionService'),
    leaderboardService: token<ILeaderboardService>('LeaderboardService'),
};

export { container }