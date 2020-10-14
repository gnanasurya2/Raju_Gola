import React from "react";

import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Setting = (props) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
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
      </TouchableOpacity>
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 100,
    borderBottomWidth: 4,
    borderBottomColor: Colors.grey,
    flexDirection: "row",
    alignItems: "center",
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
