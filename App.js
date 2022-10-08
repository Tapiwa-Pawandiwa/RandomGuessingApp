import { StyleSheet, Text, View, ImageBackground } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <LinearGradient colors={["#4e0379", "#ddb22f"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.jpg")}
        resizeMode="cover"
        style=
      >
        <StartGameScreen />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});

//build a game which has multiple screens
//we pick a number between 1 and 99 ..
// we want the user to be able to reset the input
//game screen - second main screen - the computer guesses the number and we should tell
//the computer to guess lower or higher
//everu guess is logged and scrollable
//once the correct guess is made - we transition to a different screen
//views only take up as much space as the content in them
