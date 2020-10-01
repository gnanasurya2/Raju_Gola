import React from "react";

import { Text, View, StyleSheet, FlatList } from "react-native";
import Leader from "../components/Leader";
const data = [
  {
    name: "Evan Bacon",
    url:
      "https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg",
  },
  {
    name: "Robert Smith",
    url:
      "https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg",
  },
  {
    name: "Ben Wyatt",
    url:
      "https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg",
  },
  {
    name: "Ron Swanson",
    url:
      "https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg",
  },
  {
    name: "Tom Havenford",
    url:
      "https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg",
  },
  {
    name: "Harry Potter",
    url:
      "https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg",
  },
  {
    name: "Gnanasurya",
    url:
      "https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg",
  },
];
const LeaderboardScreen = (props) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Leader url={item.url} name={item.name} number={index + 1} />
        )}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    marginTop: 50,
    paddingHorizontal: "5%",
  },
});

export default LeaderboardScreen;
