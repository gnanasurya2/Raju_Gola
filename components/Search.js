import React from "react";

import { TextInput, StyleSheet } from "react-native";
const Search = (props) => {
  return <TextInput style={styles.wrapper} placeholder="Search" />;
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
  },
});

export default Search;
