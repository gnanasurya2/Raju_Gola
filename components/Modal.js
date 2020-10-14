import React from "react";

import { Text, View, StyleSheet, Modal } from "react-native";
import Button from "./Button";
const Modals = (props) => {
  return (
    <Modal animationType="fade" visible={props.visible} transparent={true}>
      <View style={styles.wrapper}>
        <View style={styles.box}>
          <Text style={styles.text}>{props.title}</Text>
          <Button
            text="ok"
            border={[40]}
            style={{
              backgroundColor: "green",
              paddingHorizontal: 24,
              marginTop: 24,
            }}
            onPress={props.toggleModal}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    backgroundColor: "white",
    minHeight: 300,
    borderRadius: 16,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default Modals;
