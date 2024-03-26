import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

export interface UserProfile {
   id: string,
   name: string,
   email: string,
   verified: boolean,
   avatar: string | undefined,
   followers: number,
   followings: number,
}

interface AuthState{
   profile: UserProfile |null;
   loggedIn: boolean,
   busy: boolean
}

const initialState: AuthState = {
   profile: null,
   loggedIn: false,
   busy: false
}

const userSlice = createSlice({
   name: "auth", 
   initialState, 
   reducers: {
      updateProfile(authState, {payload}: PayloadAction<UserProfile |null> ){
         authState.profile = payload
      },
      updateLoggedInState(authState, {payload}) {
         authState.loggedIn = payload
      },
      updateBusyState(authState, {payload}: PayloadAction<boolean> ){
         authState.busy = payload
      }
   }
})


export const {updateLoggedInState, updateProfile, updateBusyState} = userSlice.actions;

export const getAuthState =  createSelector(
   (state: RootState) => state,
   ({auth}) => auth
)
export default userSlice.reducer