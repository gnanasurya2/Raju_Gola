import React, { useEffect } from "react";

import { Text, View, StyleSheet } from "react-native";
import Button from "../components/Button";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import { addCourse } from "../database/database";

Stripe.setOptionsAsync({
  publishableKey:
    "pk_test_51HZhSxJ4AheT715GJTgr904UnyyionRtuoUVMnkmZM77B0oEqbyWqceJ9bNMjAStbQn5BzEWsokknThAaKiTdZ6g00fAGFpzat",
});
const RazorPayScreen = (props) => {
  const params = props.route.params;
  useEffect(() => {
    console.log({ params });
  }, []);
  const clickHanlder = () => {
    addCourse(params.type, params.title, params.id);
    props.navigation.navigate("Details", {
      value: params.data,
      id: params.id,
    });
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Razorpay Payment</Text>
      <Button
        border={[20]}
        text="Pay"
        style={{ width: 100, marginVertical: 32 }}
        onPress={clickHanlder}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
  },
});

export default RazorPayScreen;
