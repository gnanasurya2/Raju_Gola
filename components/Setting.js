import React from "react";

import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Setting = (props) => {
  return (
    <View style={styles.wrapper}>
      {props.url ? (
        <Image source={{ uri: props.url }} style={styles.image} />
      ) : null}
      {props.icon ? (
        <View style={{ width: 60 }}>
          <MaterialCommunityIcons
            name={props.icon}
            size={48}
            style={{ alignSelf: "center" }}
          />
        </View>
      ) : null}
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    height: 100,
    borderBottomWidth: 4,
    borderBottomColor: Colors.grey,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  text: {
    marginLeft: 24,
    fontSize: 20,
  },
});

export default Setting;
