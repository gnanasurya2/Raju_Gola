import React, { useState } from "react";

import { Text, View, StyleSheet } from "react-native";
import Button from "../components/Button";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import StripeCheckout from "expo-stripe-checkout";
import PurchaseProduct from "../Stripe/PurchaseProduct";

Stripe.setOptionsAsync({
  publishableKey:
    "pk_test_51HZhSxJ4AheT715GJTgr904UnyyionRtuoUVMnkmZM77B0oEqbyWqceJ9bNMjAStbQn5BzEWsokknThAaKiTdZ6g00fAGFpzat",
});

const WalletScreen = (props) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCardPayPress = async () => {
    try {
      setLoading(true);
      console.log("inside");
      const token = await Stripe.createTokenWithCardAsync({
        number: "4242424242424242",
        expMonth: 11,
        expYear: 17,
        cvc: "223",
      });
      console.log(token);
      setLoading(false);
      setToken(token);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onClose = () => {
    console.log("close");
  };
  const onPaymentSuccess = (token) => {
    console.log(token);
  };
  return <PurchaseProduct />;
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instruction: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});

export default WalletScreen;
