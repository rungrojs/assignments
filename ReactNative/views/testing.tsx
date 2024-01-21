import React, { useCallback, useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  ProgressBar,
  Text,
  TextInput,
} from "react-native-paper";
import Question from "../components/question";
import { QuestionModel } from "../models/question.model";
import Carousel from "react-native-snap-carousel";
import { useFocusEffect } from "@react-navigation/native";
import { TOKENS, container } from "../services/service-container";
import { RankingModel } from "../models/ranking.model";
import ScoreShower from "../components/score-shower";
import _debounce from "lodash/debounce";

export default function Testing({ navigation }: any) {
  const questionService = container.get(TOKENS.questionService);

  const [loading, setLoading] = useState(true);

  const [changingQuestion, setChangingQuestion] = useState(false);
  const [questionNo, setQuestionNo] = useState(0);
  const [questions, setQuestions] = useState<Array<QuestionModel>>([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [userName, setUserName] = useState("");

  const [showScore, setShowScore] = useState(false);
  const [finalScore, setFinalScore] = useState<RankingModel>();

  let carousel: any;
  let submitButton: any;

  useFocusEffect(
    useCallback(() => {
      questionService.getQuestions().then((questions) => {
        setQuestions(questions);
        if (questions.length > 0) {
          setQuestionNo(0);
        }
        setLoading(false);
      });
    }, [])
  );

  let selectAnswer = (answer: number) => {
    if (questions[questionNo]) {
      questions[questionNo].selectedAnswer = answer;
    }
  };

  let changePageTo = (questionNo: number) => {
    if (questionNo < 0 || questionNo > questions.length || changingQuestion) {
      return;
    }
    setChangingQuestion(true);
    setQuestionNo(questionNo);
    carousel?.snapToItem(questionNo);
  };

  let submitAnswer = _debounce(() => {
    submitButton.disabled = true;
    let userAnswers = questions.map((t) => {
      return { id: t.id, selectedAnswer: t.selectedAnswer };
    });

    questionService
      .submitAnswerAndGetLeaderboard(
        userName.length == 0 ? "Anonymous" : userName,
        userAnswers
      )
      .then((score) => {
        setFinalScore(score);
        setShowConfirm(false);
        setShowScore(true);
      });
  }, 300);

  let renderItem = ({ item, index }: any) => {
    return (
      <Question
        loading={changingQuestion}
        onSelected={selectAnswer}
        question={item}
        questionNo={index}
        totalQuestion={questions.length}></Question>
    );
  };

  return (
    <View style={[styles.container, { marginBottom: 0 }]}>
      {loading && <Text>Loading....</Text>}
      {!loading && (
        <View style={{ flex: 1 }}>
          <ProgressBar
            progress={(questionNo * 1.0) / questions.length}
            style={{
              marginTop: 0,
              height: 5,
              width: Dimensions.get("window").width,
            }}
          />
          <Carousel
            ref={(c) => {
              carousel = c;
            }}
            onScrollIndexChanged={() => {
              setChangingQuestion(false);
            }}
            vertical={false}
            scrollEnabled={false}
            firstItem={0}
            data={questions}
            renderItem={renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
          />
          {!showConfirm && !showScore && (
            <View style={[styles.navigate, { flexGrow: 0 }]}>
              <Button
                mode="contained"
                disabled={questionNo == 0}
                onPress={() => {
                  changePageTo(questionNo - 1);
                }}
                style={styles.navigateButton}>
                Back
              </Button>
              {questionNo != questions.length - 1 && (
                <Button
                  mode="contained"
                  onPress={() => {
                    changePageTo(questionNo + 1);
                  }}
                  style={styles.navigateButton}>
                  Next
                </Button>
              )}
              {questionNo == questions.length - 1 && (
                <Button
                  mode="contained"
                  onPress={() => {
                    setShowConfirm(true);
                  }}
                  style={styles.navigateButton}>
                  Submit
                </Button>
              )}
            </View>
          )}
        </View>
      )}

      <Dialog visible={showConfirm} onDismiss={() => setShowConfirm(false)}>
        <Dialog.Title>Confirm sumbit your answer?</Dialog.Title>
        <Dialog.Content>
          <Text variant="titleSmall" style={{ marginBottom: 10 }}>
            Please submit your name:
          </Text>
          <TextInput
            placeholder="Username"
            maxLength={30}
            autoFocus={true}
            value={userName}
            onChangeText={(name) => setUserName(name)}></TextInput>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            style={{ paddingLeft: 5, paddingRight: 5 }}
            mode="outlined"
            onPress={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button
            ref={(s) => {
              submitButton = s;
            }}
            style={{ paddingLeft: 5, paddingRight: 5, marginLeft: 10 }}
            mode="contained"
            onPress={() => submitAnswer()}>
            Confirm
          </Button>
        </Dialog.Actions>
      </Dialog>

      <ScoreShower
        show={showScore}
        score={finalScore?.score ?? 0}
        fullScore={questions.length}
        order={finalScore?.order ?? 0}
        navigation={navigation}></ScoreShower>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
  },
  navigate: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
  },
  navigateButton: {
    width: "50%",
    padding: 5,
    borderRadius: 0,
    borderColor: "white",
  },
});
