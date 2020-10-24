import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet, ScrollView } from "react-native";
import Course from "../components/Course";
import { FetchCourse, fetchWebinar } from "../database/database";

const HomeScreen = (props) => {
  const [data, setData] = useState(null);

  const fetching = () => {
    FetchCourse().then((data) => {
      const rawData = data.rows._array;
      if (rawData.length) {
        setData([
          [...rawData.filter((ele) => ele.type === "course")],
          [...rawData.filter((ele) => ele.type === "webinar")],
          [...rawData.filter((ele) => ele.type === "blog")],
        ]);
      } else {
        setData(null);
      }
    });
  };
  useEffect(() => {
    fetching();
  }, []);
  useEffect(() => {
    const listener = props.navigation.addListener("focus", () => {
      fetching();
    });
    return listener;
  }, []);
  const pressHandler = (item) => {
    if (item.type === "course") {
      props.navigation.navigate("Search", {
        screen: "Details",
        params: {
          id: item.id,
        },
      });
    } else if (item.type === "webinar") {
      fetchWebinar(item.courseId).then((data) => {
        props.navigation.navigate("Search", {
          screen: "Webinar",
          params: {
            data: { ...data.rows._array[0] },
            bought: true,
          },
        });
      });
    } else {
      props.navigation.navigate("Search", {
        screen: "Blog",
        params: {
          id: item.id,
          webinar: true,
        },
      });
    }
  };

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.container}>
      {data ? (
        <>
          {data[0].length ? (
            <>
              <Text style={styles.text}>My Courses</Text>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  width: `${data[0].length * 90}%`,
                  justifyContent: "space-evenly",
                }}
                showsHorizontalScrollIndicator={false}
              >
                {data[0].map((ele) => (
                  <Course
                    style={{
                      width: `${90 / data[0].length}%`,
                    }}
                    key={ele.id}
                    percentage={ele.percentageCompleted}
                    title={ele.title}
                    onPress={() => pressHandler(ele)}
                  />
                ))}
              </ScrollView>
            </>
          ) : null}
          {data[1].length ? (
            <>
              <Text style={styles.text}>My Webinar</Text>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  width: `${data[1].length * 90}%`,
                  justifyContent: "space-evenly",
                }}
                showsHorizontalScrollIndicator={false}
              >
                {data[1].map((ele) => (
                  <Course
                    style={{
                      width: `${90 / data[1].length}%`,
                    }}
                    key={ele.id}
                    percentage={ele.percentageCompleted}
                    title={ele.title}
                    onPress={() => pressHandler(ele)}
                  />
                ))}
              </ScrollView>
            </>
          ) : null}
          {data[2].length ? (
            <>
              <Text style={styles.text}>My Courses</Text>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  width: `${data[2].length * 90}%`,
                  justifyContent: "space-evenly",
                }}
                showsHorizontalScrollIndicator={false}
              >
                {data[2].map((ele) => (
                  <Course
                    style={{
                      width: `${90 / data[2].length}%`,
                    }}
                    key={ele.id}
                    percentage={ele.percentageCompleted}
                    title={ele.title}
                    onPress={() => pressHandler(ele)}
                  />
                ))}
              </ScrollView>
            </>
          ) : null}
        </>
      ) : (
        <Text style={{ marginTop: "80%", fontSize: 20, fontWeight: "bold" }}>
          No Content Available
        </Text>
      )}
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    marginTop: 50,
  },
  courseWrapper: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: "80%",
    textAlign: "left",
    fontSize: 24,
  },
});

export default HomeScreen;
