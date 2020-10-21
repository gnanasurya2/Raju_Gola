import React, { useState } from "react";

import { Text, ScrollView, StyleSheet, Image, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import Modals from "../components/Modal";
import firebase from "../constants/Firebase";
import { addCourse } from "../database/database";

const CourseScreen = (props) => {
  const { data } = props.route.params;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const paymentHandler = async () => {
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
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .update({
          amount: amount - data.price,
        });
      console.log(amount);
      setLoading(false);
      addCourse(data.type, data.title, data.id);
      props.navigation.navigate("Details", {
        value: data.data,
        id: data.id,
      });
    }
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
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.para}>{data.description}</Text>
      <View style={styles.DesWrapper}>
        <View style={styles.des}>
          <MaterialCommunityIcons name="video" size={32} style={styles.icon} />
          <Text style={styles.description}>{data.videos} videos</Text>
        </View>
        <View style={styles.des}>
          <MaterialCommunityIcons name="timer" size={32} style={styles.icon} />
          <Text style={styles.description}>{data.time} hours</Text>
        </View>
      </View>
      <Button
        border={[20, 20, 20, 20]}
        style={{ backgroundColor: "green", width: 200, alignSelf: "center" }}
        text={`Pay ₹${data.price}`}
        onPress={paymentHandler}
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
    height: 200,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 16,
  },
  para: {
    fontSize: 20,
  },
  DesWrapper: {
    marginVertical: 24,
    marginLeft: 16,
  },
  des: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    marginRight: 16,
    color: "#B6B6B6",
  },
  description: {
    fontSize: 16,
    color: "#B6B6B6",
  },
});

export default CourseScreen;
