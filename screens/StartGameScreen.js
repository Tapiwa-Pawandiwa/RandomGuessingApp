import { TextInput, View, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen() {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}
//every view maks a new flex container
export default StartGameScreen;
//we pnly want numbers on our input
//we want to also control which keyboard is opened by the device : we use the keyboardtype prop
const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,//takes up maximum space
    padding: 16,
    margin: 10,
    maringHorizontal: 24,
    marginTop: 100, //to push view away from top
    backgroundColor: "#4e0329",
    borderRadius: 8,
    elevation: 8, //only applies to android
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 }, //shadow for ios
    shadowRadius: 6,
    shadowOpacity: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },

  //style object responsible for text/number input

  numberInput: {
    height: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2, //same as line weight
    color: "#ddb52f",
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
    marginVertical: 8,
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  }
});
