import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addCourse, addWebinar } from "../database/database";
import Button from "../components/Button";
import firebase from "../constants/Firebase";
import Modals from "../components/Modal";
import * as Linking from "expo-linking";

const WebinarDetailsScreen = (props) => {
  const { data, bought } = props.route.params;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const payHandler = async () => {
    setLoading(true);
    let amount,
      email = firebase.auth().currentUser.email;
    await firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        amount = doc.data().amount;
      });
    if (amount < data.price) {
      setVisible(true);
      setLoading(false);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .update({
          amount: amount - data.price,
        });
      setLoading(false);
      addCourse(data.type, data.title, data.id);
      addWebinar(
        data.id,
        data.data,
        data.time,
        data.date,
        data.description,
        data.url
      );
      props.navigation.navigate("Home");
    }
  };
  const openHandler = () => {
    Linking.openURL(data.data);
  };
  const toggleHandler = () => {
    props.navigation.navigate("Setting", {
      screen: "Wallet",
    });
    setVisible(false);
  };
  return (
    <ScrollView style={styles.wrapper}>
      <Modals
        title="sufficient amount is not available"
        visible={visible}
        toggleModal={toggleHandler}
      />
      <Image
        source={{
          uri: data.url,
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{data.description}</Text>
      <View style={styles.container}>
        <MaterialCommunityIcons name="timer" size={32} color="#B6B6B6" />
        <Text style={styles.timeText}>{data.time} hour</Text>
      </View>
      <View style={styles.container}>
        <MaterialCommunityIcons name="calendar" size={32} color="#B6B6B6" />
        <Text style={styles.timeText}>{data.date}</Text>
      </View>
      <Button
        border={[30]}
        text={bought ? "start" : `Pay ₹${data.price}`}
        style={{
          backgroundColor: "green",
          width: 160,
          alignSelf: "center",
          marginTop: 100,
        }}
        onPress={bought ? openHandler : payHandler}
        loading={loading}
      />
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    marginTop: 50,
    paddingHorizontal: "5%",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 16,
  },
  text: {
    fontSize: 20,
    marginVertical: 24,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  timeText: {
    fontSize: 16,
    color: "#b6b6b6",
    marginLeft: 16,
  },
});

export default WebinarDetailsScreen;
