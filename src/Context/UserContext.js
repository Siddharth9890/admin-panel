import { createContext, useReducer } from "react";

export const UserContext = createContext();

const userReducer = (state, action) => {
  if (action.type === "SIGN_IN") return { ...state, userData: action.payload };
  else if (action.type === "SIGN_OUT") {
    localStorage.clear("admin");
    return { userData: action.payload };
  } else return state;
};

export function UserProvider({ children }) {
  // initial value is empty user
  const [state, dispatch] = useReducer(userReducer, {
    userData: null,
  });

  //   sign in dispatcher
  const signInContext = (user) => {
    dispatch({ type: "SIGN_IN", payload: user });
  };

  //   sign out dispatcher
  const signOutContext = () => {
    dispatch({ type: "SIGN_OUT", payload: null });
  };

  //   we provide the user and two functions to all the components
  return (
    <UserContext.Provider value={{ ...state, signInContext, signOutContext }}>
      {children}
    </UserContext.Provider>
  );
}
