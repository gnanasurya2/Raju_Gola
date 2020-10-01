import React from "react";

import { Text, ScrollView, View, StyleSheet } from "react-native";
import Search from "../components/Search";
import CourseCard from "../components/CourseCard";
const SearchScreen = (props) => {
  return (
    <ScrollView style={styles.wrapper}>
      <Search />
      <View style={styles.container}>
        <Text style={styles.text}>Latest Courses:</Text>
        <CourseCard
          url="https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg"
          title="Introduction to programming"
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Latest Webinars:</Text>
        <CourseCard
          url="https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg"
          title="How to make a website"
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Latest Blogs:</Text>
        <CourseCard
          url="https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg"
          title="Getting started with React"
        />
      </View>
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    marginTop: 50,
  },
  container: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 16,
  },
  text: {
    marginVertical: 24,
    fontSize: 24,
  },
});

export default SearchScreen;
