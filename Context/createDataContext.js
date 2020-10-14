import React, { useReducer } from "react";
const Context = React.createContext(null);
export default (reducer, action, defaultValue) => {
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    console.log(defaultValue);
    const boundActions = {};

    for (let key in action) {
      boundActions[key] = action[key](dispatch);
    }
    console.log(boundActions, "Asdasd");
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context: Context, Provider: Provider };
};
