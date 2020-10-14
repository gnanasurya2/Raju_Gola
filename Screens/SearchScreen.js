import React, { useState, useEffect } from "react";

import { Text, ScrollView, View, StyleSheet } from "react-native";
import Search from "../components/Search";
import CourseCard from "../components/CourseCard";
import firebase from "../constants/Firebase";

const SearchScreen = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => console.log(data), [data]);
  useEffect(() => {
    console.log({ data });
    if (data === null || !data.length) {
      const course = [];
      firebase
        .firestore()
        .collection("Content")
        .orderBy("type")
        .limit(3)
        .get()
        .then((query) => {
          query.forEach((doc) => course.push({ ...doc.data(), id: doc.id }));
          setData(course);
        });
    }
  }, []);
  const clickHandler = (ele) => {
    if (ele.type === "course") {
      props.navigation.navigate("Course", {
        data: ele,
      });
    } else if (ele.type === "webinar") {
      props.navigation.navigate("Webinar", {
        screen: "Webinar",
      });
    } else {
      props.navigation.navigate("Blog", {
        screen: "Blog",
      });
    }
  };
  return (
    <ScrollView style={styles.wrapper}>
      <Search />
      {data ? (
        <>
          <View style={styles.container}>
            <Text style={styles.text}>Latest Courses:</Text>
            {data
              .filter((ele) => ele.type === "course")
              .map((ele) => (
                <CourseCard
                  url={ele.url}
                  title={ele.title}
                  onPress={() => clickHandler(ele)}
                />
              ))}
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Latest Webinars:</Text>
            <CourseCard
              url="https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg"
              title="How to make a website"
              onPress={() => clickHandler("webinar")}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Latest Blogs:</Text>
            <CourseCard
              url="https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg"
              title="Getting started with React"
              onPress={() => clickHandler("Blog")}
            />
          </View>
        </>
      ) : null}
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
