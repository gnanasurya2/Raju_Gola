import React from "react";
import { StyleSheet, Text, View, Platform, TextInput } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import Button from "../components/Button";
import Input from "../components/Input";
import axois from "axios";
import Colors from "../constants/Colors";
import firebase from "../constants/Firebase";
function testID(id) {
  return Platform.OS === "android"
    ? { accessible: true, accessibilityLabel: id }
    : { testID: id };
}

export default class WalletScreen extends React.Component {
  state = {
    token: "bbb",
    loading: false,
    amount: null,
    currentAmount: 0,
    focused: false,
    isValid: true,
  };
  amountRetreiver = () => {
    const email = firebase.auth().currentUser.email;
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => this.setState({ currentAmount: doc.data().amount }));
  };
  componentDidMount() {
    this.amountRetreiver();
  }
  UNSAFE_componentWillMount() {
    Stripe.setOptionsAsync({
      publishableKey: "pk_test_M315xbWEvSQjt7B8ZJYzuipC",
      androidPayMode: "test",
    });
  }
  currentuser = () => {};
  handleCardPayPress = async () => {
    if (!Number.isInteger(parseInt(this.state.amount))) {
      this.setState({ isValid: false });
      return;
    }
    try {
      this.setState({ loading: true, token: null });
      const token = await Stripe.paymentRequestWithCardFormAsync();
      console.log(token.tokenId);
      const email = firebase.auth().currentUser.email;
      axois
        .post(
          "https://us-central1-raju-gola.cloudfunctions.net/completePaymentsWithStripe",
          {
            amount: parseInt(this.state.amount) * 100,
            token: "tok_visa",
            receipt_email: email,
          }
        )
        .then((res) => {
          console.log(res.data);
          const email = firebase.auth().currentUser.email;
          let amount;
          firebase
            .firestore()
            .collection("users")
            .doc(email)
            .get()
            .then((doc) => {
              amount = doc.data().amount;
              firebase
                .firestore()
                .collection("users")
                .doc(email)
                .update({
                  amount: amount + parseInt(this.state.amount),
                });
              this.setState({ loading: false, token, amount: "" });
              this.amountRetreiver();
            })
            .catch((err) => console.log(err));
        });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, token, amount, currentAmount, isValid } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Total Balance</Text>
          <Text style={styles.amount}>₹ {currentAmount}</Text>
        </View>
        <Text style={styles.moneyText}>Enter the amount you want to add</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) =>
            this.setState({
              amount: text,
              isValid: Number.isInteger(parseInt(text)),
            })
          }
        />
        {isValid ? null : (
          <Text style={styles.warning}>Enter a valid amount</Text>
        )}
        <Button
          text="Add"
          border={[100]}
          style={{ marginTop: 24, width: 100 }}
          onPress={this.handleCardPayPress}
          loading={loading}
          color="white"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  header: {
    fontSize: 24,
    margin: 10,
    color: Colors.primaryColor,
  },
  amount: {
    fontSize: 40,
    margin: 20,
  },
  instruction: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  card: {
    width: "90%",
    height: 200,
    borderRadius: 12,
    elevation: 12,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  input: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primaryColor,
    width: "80%",
    marginTop: 16,
    fontSize: 24,
  },
  moneyText: {
    fontSize: 20,
    marginTop: 20,
  },
  warning: {
    color: "red",
    textAlign: "left",
    width: "80%",
    marginTop: 10,
    fontSize: 16,
  },
});
