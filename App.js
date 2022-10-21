import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import AppLoading from "expo-app-loading";
//custom fonts can be loaded using expo install expo-font
import { useFonts } from "expo-font";
export default function App() {
  //the state i want to register here is the number picked by the user
  const [userNumber, setUserNumber] = useState();
  //new state for game is over state
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);
  //first element of usefonts is a boolean which tells us whether the fonts have been loaded or not
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  function pickedNumberhandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  //change game state
  function gameOverHandler(numberOfRounds) {
    //function to be passed to game scrreen
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }
  //helper variable
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }
  let screen = <StartGameScreen onPickNumber={pickedNumberhandler} />;

  if (userNumber) {
    //if usernumber is true (if its a valid number go to gamescreen)
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.jpg")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.25,
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
