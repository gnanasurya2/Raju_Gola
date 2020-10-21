import React from "react";

import { Text, View, StyleSheet, Image } from "react-native";
import Card from "./Card";
import Button from "./Button";

const Webinar = (props) => {
  return (
    <Card style={styles.wrapper}>
      <Image source={{ uri: props.url }} style={styles.image} />
      <Button border={[0, 0, 16, 16]} text="Start" onPress={props.onPress} />
    </Card>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    height: 240,
    marginBottom: 16,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default Webinar;
