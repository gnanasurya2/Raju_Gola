import React from "react";

import { Text, View, StyleSheet, TextInput } from "react-native";
const Input = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.type}
        secureTextEntry={props.secure}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    width: "80%",
    marginVertical: 24,
  },
  title: {
    color: "white",
    fontSize: 24,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginTop: 8,
    fontSize: 16,
    color: "white",
    paddingLeft: 8,
    paddingBottom: 4,
  },
});

export default Input;
