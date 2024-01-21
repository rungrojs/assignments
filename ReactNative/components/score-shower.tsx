import { StyleSheet, View } from "react-native";
import { Button, Dialog, Text } from "react-native-paper";

export default function ScoreShower({
  order,
  score,
  fullScore,
  show,
  navigation,
}: {
  order: number;
  score: number;
  fullScore: number;
  show: boolean;
  navigation: any;
}) {
  return (
    <Dialog
      visible={show}
      onDismiss={() => {
        navigation.pop();
      }}>
      <Dialog.Content>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Text style={[styles.mt10, {}]} variant="labelLarge">
            - FINAL SCORE -
          </Text>
          <View
            style={[
              styles.mt10,
              { flexDirection: "row", alignItems: "baseline" },
            ]}>
            <Text variant="displayLarge">{score}</Text>
            <Text variant="labelMedium"> / {fullScore}</Text>
          </View>
          <Text style={[styles.mt10]} variant="labelMedium">
            Rank : {order}
          </Text>
          <Button
            style={[styles.mt30]}
            mode="contained"
            onPress={() => {
              navigation.pop();
            }}>
            Close
          </Button>
        </View>
      </Dialog.Content>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  mt10: {
    marginTop: 10,
  },
  mt30: {
    marginTop: 30,
  },
});
