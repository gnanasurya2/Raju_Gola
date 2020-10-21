import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./Contexts";
import firebase from "../constants/Firebase";

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            isLoading: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case "TOGGLE_LOADING":
          return {
            ...prevState,
            isLoading: true,
          };
        case "ON_ERROR":
          return {
            ...prevState,
            error: action.error,
            isLoading: false,
          };
        case "CLEAR_ERROR":
          return {
            ...prevState,
            error: null,
          };
      }
    },
    {
      isLoading: false,
      isSignout: false,
      userToken: null,
      error: null,
    }
  );
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "TOGGLE_LOADING" });
        firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then((data) => {
            AsyncStorage.setItem("userToken", data.user.refreshToken);
            dispatch({ type: "SIGN_IN", token: data.user.refreshToken });
          })
          .catch((e) => dispatch({ type: "ON_ERROR", error: e.message }));
      },
      signOut: () => {
        AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        dispatch({ type: "TOGGLE_LOADING" });
        firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(data.email)
              .set({
                email: data.email,
                amount: 0,
              })
              .then(() => {
                dispatch({ type: "SIGN_UP" });
                data.pressHandler();
              });
          })
          .catch((error) =>
            dispatch({ type: "ON_ERROR", error: error.message })
          );
      },
      clearError: () => dispatch({ type: "CLEAR_ERROR" }),
    }),
    []
  );
  return (
    <AuthContext.Provider value={{ state, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
};
