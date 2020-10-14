import React, { useState, useContext, useEffect } from "react";

import { Text, View, StyleSheet, Pressable } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import Colors from "../constants/Colors";
import Modals from "../components/Modal";
import { AuthContext } from "../Context/Contexts";

const SignUpScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const value = useContext(AuthContext);
  const pressHandler = () => {
    props.navigation.navigate("SignUp");
  };

  const toggleHandler = () => {
    setModal((state) => !state);
    value.clearError();
  };

  useEffect(() => {
    if (value.state.error !== null) {
      setText(value.state.error);
      setModal(true);
    }
  }, [value.state.error]);

  const signInHandler = () => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setModal(true);
      setText("Enter a valid Email");
      return;
    }
    if (password.length < 6) {
      setModal(true);
      setText("Password should be atleast 6 characters");
      return;
    }
    value.signIn({ email, password });
  };

  return (
    <View style={styles.wrapper}>
      <Modals title={text} toggleModal={toggleHandler} visible={modal} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome,</Text>
        <Text style={styles.subTitle}>Sign In to continue</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Input
          title="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <Input
          title="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secure
        />
      </View>
      <Button
        text="Sign In"
        border={[40]}
        style={{ backgroundColor: "green", paddingHorizontal: 24 }}
        onPress={signInHandler}
        loading={value.state.isLoading}
      />
      <View style={styles.footerWrapper}>
        <Text style={styles.footer}>New user</Text>
        <Pressable onPress={pressHandler} style={styles.press}>
          <Text style={styles.bold}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 50,
  },
  container: {
    width: "90%",
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 8,
  },
  subTitle: {
    color: "#B6B6B6",
    fontSize: 24,
  },
  inputWrapper: {
    width: "100%",
    alignItems: "center",
  },
  footer: {
    fontSize: 16,
    color: "#B6B6B6",
  },
  bold: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 6,
  },
  footerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SignUpScreen;
