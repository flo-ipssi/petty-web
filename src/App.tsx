// import { useState } from 'react'
import AppContainer from "./components/AppContainer/AppContainer";
import TabNavigator from "./navigation/TabNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getAuthState, updateBusyState, updateLoggedInState, updateProfile } from "./app/auth";
import { useEffect } from "react";
import { Keys, getFromAsyncStorage } from "./utils/asyncStorage";

function App() {

  const { loggedIn, busy } = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true))
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN)
        if (!token) return;

        const reponse = await fetch("http://localhost:8989/auth/is-auth", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Permet les requêtes depuis toutes les origines
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await reponse.json();
        dispatch(updateProfile(data.profile))
        dispatch(updateLoggedInState(true))
      } catch (error) {
        console.log('Auth error: ' + error)
      }
      dispatch(updateBusyState(false))
    }
    fetchAuthInfo()
  }, [])
  return (
      <AppContainer>
        {loggedIn ? <AuthNavigator /> : <TabNavigator />}
      </AppContainer>
  );
}

export default App;
