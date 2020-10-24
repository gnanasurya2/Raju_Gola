import React, { useState, useEffect, useRef, useCallback } from "react";

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  AppState,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Video from "../components/Video";
import {
  FetchContent,
  AddContent,
  updateContent,
  updateCourse,
} from "../database/database";

const CourseDetailsScreen = (props) => {
  const [videoId, setVideoId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  const resource = props.route.params;
  const playerRef = useRef();

  const final = async () => {
    let time, total;
    await playerRef.current
      .getCurrentTime()
      .then((t) => (time = Math.floor(t)));
    await playerRef.current.getDuration().then((t) => (total = Math.floor(t)));
    if (data.length && time !== undefined && total !== undefined) {
      const vId = data.filter((ele) => ele.videoId === videoId)[0].id;
      updateContent(vId, time, time === total ? 1 : 0);
    }
  };
  useEffect(() => {
    const goBack = props.navigation.addListener("tabPress", (e) => {
      e.preventDefault();
      props.navigation.naviagtion("Search", {
        screen: "Search",
      });
    });
    return goBack;
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("blur", async () => {
      await final();
    });
    return unsubscribe;
  }, [props.navigation]);

  const storeValues = (result) => {
    setData(result);
    const index = result.findIndex((ele) => !ele.completed);
    setVideoId(result[index].videoId);
    const time = result[index].timeRemaining;
    playerRef.current.seekTo(time !== -1 ? time : 0);
  };

  const unstarted = () => {
    const index = data.findIndex((ele) => !ele.completed);
    const time = data[index].timeRemaining;
    playerRef.current.seekTo(time !== -1 ? time : 0);
  };

  const fetchValues = async (id) => {
    await FetchContent(id).then((res) => {
      storeValues(res.rows._array);
    });
  };

  const appStateChange = (event) => {
    if (event === "background") {
      final();
    }
  };

  useEffect(() => {
    AppState.addEventListener("change", appStateChange);
    return () => {
      AppState.removeEventListener("change", appStateChange);
    };
  }, []);

  useEffect(() => {
    const fetching = async () => {
      await FetchContent(resource.id).then(async (res) => {
        if (!res.rows.length) {
          for (let index = 0; index < resource.value.length; index++) {
            const ele = resource.value[index];
            AddContent(resource.id, ele.videoId, ele.name, -1, false);
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
    let index = currentIndex;
    if (index !== data.length - 1) {
      clickHandler(index + 1);
      let newData = [...data];
      newData[index].completed = 1;
      setData(newData);
      updateContent(data[index].id, -1, 1);
      updateCourse(
        Math.floor((index / data.length) * 100),
        data[index].courseId
      );
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
      <Video
        videoId={videoId}
        ended={nextVideoHandler}
        playerRef={playerRef}
        unstarted={unstarted}
      />
      <View style={{ marginTop: 300 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.videoId}
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
