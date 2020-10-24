import React, { useEffect, useState } from "react";

import { Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import Firebase from "../constants/Firebase";
import Webinar from "../components/Webinar";
import { fetchWebinar } from "../database/database";

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
    fetchWebinar(ele.id).then((data) => {
      let bought = false;
      if (data.rows._array) {
        bought = true;
      }
      let dateOne = formatDateTime(ele.date.seconds);
      let newData = { ...ele };
      newData["date"] = dateOne;

      props.navigation.navigate("Search", {
        screen: "Webinar",
        params: {
          data: newData,
          bought,
        },
      });
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
