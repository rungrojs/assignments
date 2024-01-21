import { ScrollView, StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { QuestionModel } from "../models/question.model";
import React, { useEffect, useState } from "react";

export default function QuestionForm({
  questionNo,
  totalQuestion,
  question,
  onSelected,
  loading,
}: Readonly<{
  loading?: boolean;
  questionNo: number;
  totalQuestion: number;
  question: QuestionModel | undefined;
  onSelected: (value: number) => void;
}>) {
  function setSelected(value: number) {
    onSelected(value);
  }
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
      }}>
      <Text
        variant="titleMedium"
        style={{
          marginBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        Question {questionNo + 1} of {totalQuestion}
      </Text>

      <View>
        <Text
          variant="bodyLarge"
          style={{ marginBottom: 15, paddingLeft: 10, paddingRight: 10 }}>
          {question?.text}
        </Text>
        <ScrollView style={{ paddingLeft: 5, paddingRight: 5 }}>
          <RadioButton.Group
            onValueChange={(value) => {}}
            value={selectedAnswer?.toString() ?? ""}>
            {question?.answers.map((t) => (
              <View
                key={t.id}
                style={styles.choice}
                onTouchEnd={() => {
                  setSelectedAnswer(t.id);
                  setSelected(t.id);
                }}>
                <RadioButton value={t.id.toString()} />
                <Text style={{ marginTop: 8 }}>
                  {t.text} {t.correct ? "(correct)" : ""}
                </Text>
              </View>
            ))}
          </RadioButton.Group>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  choice: {
    flex: 1,
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 15,
  },
});

export const Question = React.memo(QuestionForm);
