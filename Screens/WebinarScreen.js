import React, { useEffect, useState } from "react";

import { Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import Firebase from "../constants/Firebase";
import Webinar from "../components/Webinar";
const WebinarScreen = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!data) {
      Firebase.firestore()
        .collection("Content")
        .where("type", "==", "webinar")
        .get()
        .then((querySnapshot) => {
          const arr = [];
          querySnapshot.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id });
          });
          setData(arr);
        });
    }
  }, []);

  const clickHandler = (ele) => {
    props.navigation.navigate("Search", {
      screen: "Webinar",
      params: {
        data: ele,
      },
    });
  };
  return (
    <ScrollView style={styles.wrapper}>
      {data ? (
        data.map((ele) => (
          <Webinar url={ele.url} onPress={() => clickHandler(ele)} />
        ))
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
});

export default WebinarScreen;
