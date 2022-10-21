import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  /* Utility function which generates a random number between min and a max number defined as imports here.
 We can also pass in an excldue number which allows us to exclude a certain number from being generated.
 we want to make sure the phone cant guess immedietely 
 We use math.random (gets number between 0 and 1) upper bound is excluded
 we multiply this value by the differencce between max and min to get a random value between this range 
we then use max.floor to get us an integer value not a decimal 
we then add min at the end to ensure 0 isnt our value. 
 if our exclude number is picked as a random number , we recursively call generateRandomBetweena again */

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  //our exlcuded value is the one the user inputs , so the phone cant guess the usernumber
  const [currentGuess, setCurrentGuess] = useState(initialGuess); //set this random number as initial guess
  //useEffect allows you to run logic whenever some dependencies for some state change
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      //tell react the game is over
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]); //these are dependencies  [varibles and functions]
  //used to update minBoundary and maxBoundary
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    //derive a new number up or down
    //direction => 'lower' or 'greater'
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Dont Lie", "You know this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess; //we set the max to the current guess value instead of just subtracting a value from maxboundary because it might exclude the actual correct guess
    } else {
      minBoundary = currentGuess + 1; // we add one here because our min boundary in our math.random function includes the minimum and excludes the maxmimum
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }
  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <View>
        <Title>Opponents Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
      </View>
      <Card style={styles.card}>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={25} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={25} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/*guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))*/}
        {/*alternative for flatlist */}

        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={
            (item) =>
              item /*used as key because we need a key but flatlist automatcally takes it from data but our data is just a number not an object with a key so we create one ourselves here*/
          }
        />
      </View>
    </View>
  );
}
export default GameScreen;
// The program is guessing a number and then we should have controls to tell the program if the number is too high or too low
//therefore we definetly need to output the guessed number

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

//modern smartphones have notches at the top so we want to add
//some distance at the bottom
//the safeareaview component - detects which device and adds appropriate space at the top
