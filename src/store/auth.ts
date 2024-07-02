import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

export interface UserProfile {
   id: string,
   fullname: string | undefined,
   firstname: string | undefined,
   name: string,
   email: string,
   verified: boolean,
   avatar: string | undefined,
   address: string | undefined,
   zip: string | undefined,
   city: string | undefined,
   website: string | undefined,
   phone: string | undefined,
   description: string | undefined,
   animal_owner: boolean | undefined,
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
      },
      updateAvatar(authState, { payload }: PayloadAction<string | undefined>) {
         if (authState.profile && payload !== undefined) {
            authState.profile.avatar = payload;
         }
      },
   }
})


export const {updateLoggedInState, updateProfile, updateBusyState, updateAvatar} = userSlice.actions;

export const getAuthState =  createSelector(
   (state: RootState) => state,
   ({auth}) => auth
)
export default userSlice.reducer