import React, { useState, useEffect } from "react";

import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CourseCard from "../components/CourseCard";
import firebase from "../constants/Firebase";
import { FetchContent, fetchWebinar } from "../database/database";
const SearchScreen = (props) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState([false, false, false]);
  const dataExtractor = (type) => {
    firebase
      .firestore()
      .collection("Content")
      .orderBy("id", "desc")
      .where("type", "==", type)
      .limit(1)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          setData((state) => [...state, [{ ...doc.data(), id: doc.id }]]);
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
  function formatDateTime(input) {
    var epoch = new Date(0);
    epoch.setSeconds(parseInt(input));
    var date = epoch.toISOString();
    date = date.replace("T", " ");
    return (
      date.split(".")[0].split(" ")[0] +
      " " +
      epoch.toLocaleTimeString().split(" ")[0]
    );
  }
  const clickHandler = (ele) => {
    if (ele.type === "course") {
      FetchContent(ele.id).then((docs) => {
        if (docs.rows._array.length) {
          props.navigation.navigate("Details", {
            id: ele.id,
          });
        } else {
          props.navigation.navigate("Course", {
            data: ele,
          });
        }
      });
    } else if (ele.type === "webinar") {
      fetchWebinar(ele.id).then((docs) => {
        let bought = false,
          date = formatDateTime(ele.date.seconds),
          final = { ...ele };
        final["date"] = date;
        if (docs.rows._array.length) {
          bought = true;
        }
        props.navigation.navigate("Webinar", {
          data: final,
          bought: bought,
        });
      });
    } else {
      props.navigation.navigate("Blog", { data: ele });
    }
  };
  const loadText = (type, index) => {
    firebase
      .firestore()
      .collection("Content")
      .orderBy("id", "desc")
      .where("type", "==", type)
      .limit(7)
      .get()
      .then((docs) => {
        let newData = [];
        docs.forEach((doc) => {
          newData.push(doc.data());
        });
        let updatedData = [...data];
        updatedData[index] = newData;
        setData(updatedData);
      });
    let updatedLoaded = [...loaded];
    updatedLoaded[index] = true;
    setLoaded(updatedLoaded);
  };
  return (
    <ScrollView style={styles.wrapper}>
      {data.length === 3 ? (
        <>
          <View style={styles.container}>
            <Text style={styles.text}>Latest Courses:</Text>
            {data[0].map((ele) => (
              <CourseCard
                url={ele.url}
                title={ele.title}
                onPress={() => clickHandler(ele)}
              />
            ))}
            {loaded[0] ? null : (
              <Text
                style={styles.loadText}
                onPress={() => loadText("course", 0)}
              >
                Load More...
              </Text>
            )}
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Latest Webinars:</Text>
            {data[1].map((ele) => (
              <CourseCard
                url={ele.url}
                title={ele.title}
                onPress={() => clickHandler(ele)}
              />
            ))}
            {loaded[1] ? null : (
              <Text
                style={styles.loadText}
                onPress={() => loadText("webinar", 1)}
              >
                Load More...
              </Text>
            )}
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Latest Blogs:</Text>
            {data[2].map((ele) => (
              <CourseCard
                url={ele.url}
                title={ele.title}
                onPress={() => clickHandler(ele)}
              />
            ))}
            {loaded[2] ? null : (
              <Text style={styles.loadText} onPress={() => loadText("blog", 2)}>
                Load More...
              </Text>
            )}
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
  loadText: {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default SearchScreen;
