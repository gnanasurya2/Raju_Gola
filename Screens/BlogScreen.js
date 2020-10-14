import React from "react";

import { Text, ScrollView, StyleSheet, Image } from "react-native";
const BlogScreen = (props) => {
  return (
    <ScrollView style={styles.wrapper}>
      <Image
        source={{
          uri: "https://img-a.udemycdn.com/course/750x422/2302384_7758.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi iste,
        rem quam cumque expedita saepe laboriosam maiores pariatur repellendus
        voluptas voluptates, quos doloribus harum at aliquid! Quos repellat
        aliquid possimus ipsum ratione perspiciatis, maxime quidem, veniam nam,
        totam atque dolores. Earum provident quod aspernatur quia minus libero
        blanditiis quidem corrupti deleniti asperiores animi, ullam facilis{" "}
        {"\n\n"}
        doloribus? Culpa consectetur, placeat atque beatae maxime quae numquam
        possimus porro nulla animi ducimus quo repellat aliquid debitis itaque
        ratione blanditiis est ea, magni non expedita facere. Ducimus tempora
        accusantium incidunt? Nemo ad, voluptates quaerat totam iste sunt
        praesentium deserunt vel id, tempora veniam in facilis explicabo ipsum
        dignissimos! Id, quos. Quisquam in enim recusandae. Deleniti adipisci
        obcaecati cumque quaerat quos. Et error fugiat consequatur laboriosam
        ratione, vel, eaque minima necessitatibus sunt laudantium quia nostrum
        cum temporibus delectus? Earum officiis rem distinctio minus vero magnam
        cumque expedita fuga soluta adipisci ducimus nesciunt quia asperiores
        provident architecto suscipit, harum, obcaecati doloremque praesentium
        nostrum. Voluptate quae, officiis voluptates eligendi voluptatem
        mollitia consequuntur iusto! Rem error obcaecati, amet, eaque
        necessitatibus ratione nemo itaque accusamus commodi vero, deleniti
        ipsum beatae! Quam atque ab tempora, vero nisi asperiores fugit
        similique, rerum eius nihil aperiam non laborum voluptates doloremque
        facilis consequuntur!
      </Text>
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    marginTop: 60,
    paddingHorizontal: "5%",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
  },
  text: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 24,
  },
});

export default BlogScreen;
