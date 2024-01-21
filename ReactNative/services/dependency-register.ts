import { LeaderboardService } from "./leaderboard.service";
import { QuestionService } from "./question.service";
import { TOKENS, container } from "./service-container";

export default function dependencyRegister() {
  container
    .bind(TOKENS.questionService)
    .toInstance(QuestionService)
    .inTransientScope();

  container
    .bind(TOKENS.leaderboardService)
    .toInstance(LeaderboardService)
    .inTransientScope();
}