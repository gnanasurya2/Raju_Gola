import React from "react";

import { Text, ScrollView, StyleSheet } from "react-native";
import Webinar from "../components/Webinar";
const WebinarScreen = (props) => {
  return (
    <ScrollView style={styles.wrapper}>
      <Webinar url="https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg" />
      <Webinar url="https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg" />
      <Webinar url="https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg" />
      <Webinar url="https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg" />
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    marginTop: 50,
  },
});

export default WebinarScreen;
