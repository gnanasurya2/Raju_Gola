import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigator from "./BottomNavigator";
import AuthenticationNavigator from "./AuthenticationNavigator";
import { AuthContext } from "../Context/Contexts";

const MainNavigator = () => {
  const value = React.useContext(AuthContext);
  return (
    <NavigationContainer>
      {value.state.userToken === null ? (
        <AuthenticationNavigator />
      ) : (
        <BottomNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
