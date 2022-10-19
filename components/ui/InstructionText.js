import { Text, StyleSheet } from "react-native";
import Colors from '../../constants/colors'

function InstructionText({children,style}) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}
//styles defined on far right of array can override ones on the left 
export default InstructionText;

const styles = StyleSheet.create({

  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});
