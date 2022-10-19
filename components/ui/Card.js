import React from 'react'
import {StyleSheet,View,Text} from 'react-native';
import Colors from '../../constants/colors';

function Card({children,style}) {
  return <View style={styles.card}>{children}</View>
  
}

export default Card;

const styles = StyleSheet.create({
    card: {
        // flex: 1,//takes up maximum space
        padding: 16,
        margin: 10,
        maringHorizontal: 24,
        marginTop: 36, //to push view away from top
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 8, //only applies to android
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 }, //shadow for ios
        shadowRadius: 6,
        shadowOpacity: 0.25,
        justifyContent: "center",
        alignItems: "center",
      },

})