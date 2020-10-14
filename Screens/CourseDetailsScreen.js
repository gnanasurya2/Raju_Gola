import React, { useState, useEffect, useRef } from "react";

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Video from "../components/Video";
import { FetchCourse, FetchContent, AddContent } from "../database/database";

const CourseDetailsScreen = (props) => {
  const [videoId, setVideoId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  const resource = props.route.params;
  const playerRef = useRef();

  const storeValues = (result) => {
    setData(result);
    setVideoId(result[result.findIndex((ele) => !ele.completed)].videoId);
  };
  const fetchValues = async (id) => {
    await FetchContent(id).then((res) => {
      storeValues(res.rows._array);
    });
  };
  useEffect(() => {
    console.log(playerRef);
  }, [playerRef]);
  useEffect(() => {
    const unsub = props.navigation.addListener("blur", () => {
      playerRef.current.getCurrentTime().then((time) => console.log(time));
    });
    return unsub;
  }, [props.navigation]);
  useEffect(() => {
    const fetching = async () => {
      await FetchContent(resource.id).then(async (res) => {
        if (!res.rows.length) {
          for (let index = 0; index < resource.value.length; index++) {
            const ele = resource.value[index];
            AddContent(
              resource.id,
              ele.videoId,
              ele.name,
              -1,
              false
            ).then((res) => console.log("success"));
          }
          fetchValues(resource.id);
        } else {
          storeValues(res.rows._array);
        }
      });
    };
    fetching();
  }, []);
  const clickHandler = (index) => {
    setVideoId(data[index].videoId);
    setCurrentIndex(index);
  };

  const nextVideoHandler = () => {
    if (currentIndex !== data.length - 1) {
      clickHandler(currentIndex + 1);
      setCurrentIndex((state) => state + 1);
    }
  };

  const renderitem = (item, index) => {
    return (
      <View style={styles.section}>
        <TouchableNativeFeedback onPress={() => clickHandler(index)}>
          <View style={styles.inner}>
            <Text style={styles.title}>
              {index + 1}. {item.name}
            </Text>
            {item.completed ? (
              <MaterialCommunityIcons
                name="check-circle"
                size={32}
                color="green"
                style={{ width: 40, alignSelf: "center" }}
              />
            ) : null}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  return (
    <View>
      <Video videoId={videoId} ended={nextVideoHandler} playerRef={playerRef} />
      <View style={{ marginTop: 300 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => renderitem(item, index)}
        />
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  image: {
    flex: 1,
  },

  section: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    height: 100,
    elevation: 8,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    flex: 9,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
});

export default CourseDetailsScreen;
