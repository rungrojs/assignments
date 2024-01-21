import * as React from "react";
import { StyleSheet } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./views/home";
import Testing from "./views/testing";
import dependencyRegister from "./services/dependency-register";
import Leaderboard from "./views/leaderboard";
import theme_light from "./resources/theme/light.json";
const Stack = createNativeStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: theme_light.colors,
};

dependencyRegister();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Question!" }}
          />
          <Stack.Screen name="Testing" component={Testing} />
          <Stack.Screen name="Leaderboard" component={Leaderboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
