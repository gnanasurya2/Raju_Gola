import React from "react";

import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Card from "./Card";
const CourseCard = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card
        style={{
          height: 120,
          alignSelf: "center",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
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
    </TouchableOpacity>
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
