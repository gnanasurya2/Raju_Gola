import React from "react";

import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addCourse } from "../database/database";
import Button from "../components/Button";
import * as Linking from "expo-linking";

const WebinarDetailsScreen = (props) => {
  const { data } = props.route.params;
  const payHandler = () => {
    addCourse(data.type, data.title, data.id);
    Linking.openURL(data.data);
  };
  return (
    <ScrollView style={styles.wrapper}>
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
      <Button
        border={[30]}
        text={`pay ₹${data.price}`}
        style={{
          backgroundColor: "green",
          width: 160,
          alignSelf: "center",
          marginTop: 100,
        }}
        onPress={payHandler}
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
  },
  timeText: {
    fontSize: 16,
    color: "#b6b6b6",
    marginLeft: 16,
  },
});

export default WebinarDetailsScreen;
