// import { useState } from 'react'
import AppContainer from "./components/AppContainer/AppContainer";
import TabNavigator from "./navigation/TabNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from "./store/auth";
import { useEffect } from "react";
import {
  Keys,
  getFromAsyncStorage,
} from "./utils/asyncStorage";
import { PrimeReactProvider } from "primereact/api";
import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

function App() {
  const { loggedIn } = useSelector(getAuthState);
  const dispatch = useDispatch();
  // const apiUrl = import.meta.env;

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) return;

        const response = await fetch("http://localhost:8989/auth/is-auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(updateProfile(data.profile));
          dispatch(updateLoggedInState(true));
        }
        
      } catch (error) {
        console.log("Auth error: " + error);
      }
      dispatch(updateBusyState(false));
    };
    fetchAuthInfo();
  }, []);
  return (
    <AppContainer>
      <Router>
        {loggedIn ? (
          <PrimeReactProvider>
            <AuthNavigator />
          </PrimeReactProvider>
        ) : (
          <TabNavigator />
        )}
      </Router>
    </AppContainer>
  );
}

export default App;
