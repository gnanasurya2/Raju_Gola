import React from "react";

import { Text, StyleSheet, Image } from "react-native";
import Card from "./Card";
const CourseCard = (props) => {
  return (
    <Card
      style={{
        height: 120,
        alignSelf: "center",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: props.url,
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{props.title}</Text>
    </Card>
  );
};

const styles = new StyleSheet.create({
  image: {
    height: 120,
    width: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  text: {
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
});

export default CourseCard;
