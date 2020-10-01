import React from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
const Button = (props) => {
  return (
    <TouchableOpacity onPress={() => console.log("pressed")}>
      <View
        style={[
          styles.wrapper,
          props.border.length === 4
            ? {
                borderTopLeftRadius: props.border[0],
                borderTopRightRadius: props.border[1],
                borderBottomRightRadius: props.border[2],
                borderBottomLeftRadius: props.border[3],
              }
            : { borderRadius: props.border[0] },
        ]}
      >
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primaryColor,
  },
  text: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
  },
});

Button.propType = {
  border: PropTypes.array,
  text: PropTypes.string.isRequired,
};
Button.defaultProps = {
  border: [0],
};
export default Button;
