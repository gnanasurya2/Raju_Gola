import React from "react";

import { Text, View, StyleSheet } from "react-native";
import Card from "./Card";
import Button from "./Button";
import Colors from "../constants/Colors";
import PropTypes from "prop-types";
const Course = (props) => {
  return (
    <Card
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: 24,
        ...props.style,
      }}
    >
      <Text style={styles.text}>{props.title}</Text>
      <View style={styles.wrapper}>
        <Text style={styles.valueText}>{props.percentage}%</Text>
        <View style={styles.outerBar}>
          <View
            style={{
              height: "100%",
              width: props.percentage + "%",
              backgroundColor: Colors.secondaryColor,
              borderRadius: 20,
            }}
          ></View>
        </View>
      </View>
      <Button text="Continue" border={[0, 0, 16, 16]} onPress={props.onPress} />
    </Card>
  );
};

const styles = new StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 8,
    marginLeft: 16,
  },
  wrapper: {
    width: "90%",
    height: 80,
    alignSelf: "center",
    marginVertical: 16,
  },
  valueText: {
    textAlign: "right",
    marginVertical: 8,
    fontSize: 16,
  },
  outerBar: {
    height: 10,
    borderRadius: 20,
    backgroundColor: Colors.grey,
  },
});
Course.propTypes = {
  percentage: PropTypes.number,
};
Course.defaultProp = {
  percentage: 0,
};
export default Course;
