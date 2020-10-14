import React from "react";

import { Text, View, StyleSheet } from "react-native";
import Setting from "../components/Setting";
const SettingScreen = (props) => {
  const pressHandler = (item) => {
    props.navigation.navigate(item);
  };
  return (
    <View style={styles.wrapper}>
      <Setting
        url="https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg"
        name="Profile"
        onPress={() => pressHandler("Profile")}
      />
      <Setting
        icon="wallet"
        name="Wallet"
        onPress={() => pressHandler("Wallet")}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    marginTop: 50,
    marginHorizontal: "5%",
  },
});

export default SettingScreen;
