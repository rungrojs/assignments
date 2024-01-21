import * as React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native-paper";

export default function Home({ navigation }: any) {

  return (
    <View style={styles.container}>
      <Button
        style={[styles.button]}
        icon="format-list-bulleted"
        mode="contained"
        onPress={() => {
          navigation.push("Testing");
        }}>
        <Text style={styles.buttonText} variant="bodyMedium">
          Start New Test
        </Text>
      </Button>
      <Button
        style={[styles.button]}
        icon="chess-queen"
        mode="contained"
        onPress={() => {
          navigation.push("Leaderboard");
        }}>
        <Text style={styles.buttonText} variant="bodyMedium">
          View Leaderboard
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    marginBottom: 30,
    alignContent: "space-around",
    alignItems: "flex-start",
    minWidth: "70%",
    paddingLeft: 15,
  },
  buttonText: {
    color: "white",
    width: 30,
  },
});
