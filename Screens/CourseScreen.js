import React from "react";

import { Text, ScrollView, StyleSheet, Image, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/Button";

const CourseScreen = (props) => {
  const { data } = props.route.params;
  const paymentHandler = () => {
    props.navigation.navigate("Pay", {
      value: data.data,
      id: data.id,
    });
  };
  return (
    <ScrollView style={styles.wrapper}>
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
