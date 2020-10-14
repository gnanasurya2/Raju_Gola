import React, { useState, useContext, useEffect } from "react";

import { Text, View, StyleSheet, Pressable, Modal } from "react-native";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import Modals from "../components/Modal";
import { AuthContext } from "../Context/Contexts";

const SignUpScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");

  const value = useContext(AuthContext);

  useEffect(() => {
    if (value.state.error) {
      setText(value.state.error);
      setModal(true);
    }
  }, [value.state.error]);

  const pressHandler = () => {
    props.navigation.navigate("SignIn");
  };

  const signUpHandler = () => {
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
    if (password !== confirmPassword) {
      setModal(true);
      setText("Passwords don't match");
      return;
    }
    value.signUp({ email, password, pressHandler });
  };
  const toggleHandler = () => {
    setModal((state) => !state);
  };
  return (
    <View style={styles.wrapper}>
      <Modals title={text} toggleModal={toggleHandler} visible={modal} />
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subTitle}>Sign up to get started !</Text>
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
        <Input
          title="Confirm Password"
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
          secure
        />
      </View>
      <Button
        text="Sign Up"
        border={[20]}
        style={{ backgroundColor: "green", paddingHorizontal: 24 }}
        onPress={signUpHandler}
        loading={value.state.isLoading}
      />
      <View style={styles.footerWrapper}>
        <Text style={styles.footer}>Already have an account</Text>
        <Pressable onPress={pressHandler}>
          <Text style={styles.bold}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
  },
  container: {
    width: "90%",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 24,
    color: "#B6B6B6",
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
