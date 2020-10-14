import React, { useContext } from "react";

import { Text, View, StyleSheet, Image } from "react-native";
import Button from "../components/Button";
import { AuthContext } from "../Context/Contexts";

const ProfileScreen = (props) => {
  const value = useContext(AuthContext);

  return (
    <View style={styles.wrapper}>
      <Image
        source={{
          uri:
            "https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>Gnanasurya</Text>
      <Button text="Signout" border={[20]} onPress={() => value.signOut()} />
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 40,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ProfileScreen;
