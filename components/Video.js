import React, { useEffect, useRef } from "react";

import { Text, View, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import * as ScreenOrientation from "expo-screen-orientation";

const Video = (props) => {
  const orientationChange = (status) => {
    if (status) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };
  const playerRef = useRef();
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("interval");
    }, 1000);
    return clearInterval(interval);
  }, []);
  useEffect(() => {
    return async () => {
      console.log("exit");
      await playerRef.current
        ?.getCurrentTime()
        .then((currentTime) => console.log({ currentTime }));
    };
  }, []);
  const changeHandler = (event) => {
    if (event === "ended") {
      props.ended();
    } else if (event === "unstarted") {
      props.unstarted();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.bar}></View>
      {props.videoId ? (
        <YoutubePlayer
          height={300}
          play={true}
          videoId={props.videoId}
          webViewStyle={{ position: "relative", zIndex: 0 }}
          onFullScreenChange={orientationChange}
          onChangeState={changeHandler}
          ref={props.playerRef}
          play={false}
        />
      ) : null}
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: 300,
    marginTop: 50,
  },
  bar: {
    width: "100%",
    height: 50,
    position: "absolute",
    zIndex: 100,
    elevation: 3,
  },
});

export default Video;
