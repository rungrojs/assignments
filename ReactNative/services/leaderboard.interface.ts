import { RankingModel } from "../models/ranking.model";

export interface ILeaderboardService {
    getCurrentRanking(startFrom: number, size: number): Promise<RankingModel[]>;
    addNewScore(newScore: RankingModel): Promise<RankingModel>;
}
