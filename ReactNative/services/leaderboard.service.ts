import { RankingModel } from "../models/ranking.model";
import { ILeaderboardService } from "./leaderboard.interface";


function generateUUID() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// simulate leader board data

const leaderboardData: RankingModel[] = []

export class LeaderboardService implements ILeaderboardService {

    private ensureData() {
        if (leaderboardData.length == 0) {
            (require('../resources/data/leaderboard.data.json') as RankingModel[])
                .forEach(data => {
                    leaderboardData.push(data)
                });
        }
    }

    // simulate server side sorting and paging
    private getRanking(limit: number = 0, startFrom: number = 0): RankingModel[] {
        this.ensureData();

        // Sorting in descending order by score
        let datas = [...leaderboardData.sort((a, b) => b.score - a.score)];


        for (let index = 0; index < datas.length; index++) {
            // Checking for duplicate scores
            if (datas[index - 1] && datas[index].score === datas[index - 1].score) {
                // If scores are equal, assign the same order as the previous entry
                datas[index].order = datas[index - 1].order;
            } else {
                // If scores are different, assign the order based on the current index
                datas[index].order = index + 1;
            }
        }

        // Slicing the array to get the desired range
        datas = datas.slice(startFrom, startFrom + (limit > 0 ? limit : datas.length));
        return datas;
    }

    async getCurrentRanking(startFrom: number = 0, size: number = 15): Promise<RankingModel[]> {
        return new Promise<RankingModel[]>(resolve => {
            setTimeout(() => {
                resolve(this.getRanking(size, startFrom));
            }, 50);
        });
    }

    async addNewScore(newScore: RankingModel): Promise<RankingModel> {
        return new Promise<RankingModel>(resolve => {
            this.ensureData();
            newScore.id = generateUUID();
            leaderboardData.push(newScore);
            let currentRanking = this.getRanking();
            let rankingModel = currentRanking.find(t => t.id == newScore.id);
            if (rankingModel) {
                resolve(rankingModel);
            }
            else {
                throw new Error('Unexpected exception');
            }
        });
    }
}
