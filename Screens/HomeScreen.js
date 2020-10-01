import React from "react";

import { Text, View, StyleSheet, FlatList } from "react-native";
import Card from "../components/Card";
import Course from "../components/Course";
const types = ["My Courses", "My Webinars", "Continue Reading"];
const HomeScreen = (props) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={types}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.courseWrapper}>
            <Text style={styles.text}>{item}</Text>
            <Course percentage={75} title="Introduction to React native" />
          </View>
        )}
        style={{ width: "100%", flex: 1 }}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    marginTop: 50,
  },
  courseWrapper: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    width: "80%",
    textAlign: "left",
    fontSize: 24,
  },
});

export default HomeScreen;
