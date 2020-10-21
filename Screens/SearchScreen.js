import React, { useState, useEffect } from "react";

import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Search from "../components/Search";
import CourseCard from "../components/CourseCard";
import firebase from "../constants/Firebase";

const SearchScreen = (props) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  const dataExtractor = (type) => {
    firebase
      .firestore()
      .collection("Content")
      .where("type", "==", type)
      .limit(1)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          setData((state) => [...state, { ...doc.data(), id: doc.id }]);
        });
      });
  };
  useEffect(() => {
    if (data === null || !data.length) {
      dataExtractor("course");
      dataExtractor("webinar");
      dataExtractor("blog");
    }
  }, []);
  const clickHandler = (ele) => {
    if (ele.type === "course") {
      props.navigation.navigate("Course", {
        data: ele,
      });
    } else if (ele.type === "webinar") {
      props.navigation.navigate("Webinar", {
        data: ele,
      });
    } else {
      props.navigation.navigate("Blog", { data: ele });
    }
  };
  const searchHandler = (text) => {
    setSearchText(text);
    firebase.firestore().collection("Content").orderBy("title").startAt(text);
  };
  return (
    <ScrollView style={styles.wrapper}>
      <Search value={searchText} onChangeText={searchHandler} />
      {data.length ? (
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
            {data
              .filter((ele) => ele.type === "webinar")
              .map((ele) => (
                <CourseCard
                  url={ele.url}
                  title={ele.title}
                  onPress={() => clickHandler(ele)}
                />
              ))}
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Latest Blogs:</Text>
            {data
              .filter((ele) => ele.type === "blog")
              .map((ele) => (
                <CourseCard
                  url={ele.url}
                  title={ele.title}
                  onPress={() => clickHandler(ele)}
                />
              ))}
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}
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
