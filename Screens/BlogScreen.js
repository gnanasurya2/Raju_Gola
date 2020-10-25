import React, { useEffect } from "react";

import { Text, ScrollView, StyleSheet, Image } from "react-native";
import { FetchContent, addCourse, AddContent } from "../database/database";

const BlogScreen = (props) => {
  const { data } = props.route.params;
  useEffect(() => {
    FetchContent(data.id).then((docs) => {
      if (!docs.rows.length) {
        addCourse("blog", data.title, data.id);
      }
    });
  }, []);
  return (
    <ScrollView style={styles.wrapper}>
      <Image
        source={{
          uri: data.url,
        }}
        style={styles.image}
      />
      {data.data.split("/n").map((ele, index) => (
        <Text style={styles.text} key={index}>
          {ele}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    marginTop: 60,
    paddingHorizontal: "5%",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
  },
  text: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 24,
  },
});

export default BlogScreen;
