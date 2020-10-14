import React from "react";

import { Text, View, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/Button";

const WebinarDetailsScreen = (props) => {
  const payHandler = () => {
    props.navigation.navigate("Pay");
  };
  return (
    <View style={styles.wrapper}>
      <Image
        source={{
          uri: "https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ad
        consequuntur perferendis exercitationem repellendus assumenda?
      </Text>
      <View style={styles.container}>
        <MaterialCommunityIcons name="timer" size={32} color="#B6B6B6" />
        <Text style={styles.timeText}>1 hour</Text>
      </View>
      <Button
        border={[30]}
        text="pay ₹200"
        style={{
          backgroundColor: "green",
          width: 160,
          alignSelf: "center",
          marginTop: 100,
        }}
        onPress={payHandler}
      />
    </View>
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
