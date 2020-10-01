import React from "react";

import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";

const Leader = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: props.url }} style={styles.image} />
        <Text style={styles.text}>{props.name}</Text>
      </View>
      <Text style={styles.number}>{props.number}</Text>
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.grey,
    borderBottomWidth: 3,
    justifyContent: "space-between",
  },
  imageWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  text: {
    fontSize: 20,
  },
  number: {
    fontSize: 32,
    marginHorizontal: 16,
    color: "gold",
  },
});

export default Leader;
