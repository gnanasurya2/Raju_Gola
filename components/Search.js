import React from "react";

import { TextInput, StyleSheet } from "react-native";
const Search = (props) => {
  return (
    <TextInput
      style={styles.wrapper}
      placeholder="Search"
      value={props.value}
      onChangeText={props.onChangeText}
    />
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 8,
    height: 40,
    borderRadius: 48,
    paddingLeft: 16,
    fontSize: 20,
    marginTop: 16,
    marginBottom: 16,
  },
});

export default Search;
