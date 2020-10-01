import React from "react";

import { View, StyleSheet } from "react-native";
const Card = (props) => {
  return (
    <View style={{ ...styles.wrapper, ...props.style }}>{props.children}</View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    width: "90%",
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 16,
  },
});

export default Card;
