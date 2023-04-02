
// import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase/config.js";
import { authSlice } from "./authReducer.js";

const auth = getAuth(app);

export const authSignUp =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } =await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user, { displayName: name });

      console.log('USER', user);

      const { displayName, uid } = user;

      dispatch(
        authSlice.actions.updateUserProfile({ userId: uid, name: displayName })
      )
        
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log("user", user);
     
    } catch (error) {
      
      console.log("error.message", error.message);

    }
  };
export const authSignOut = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSlice.actions.authSignOut());

};

export const authStateChange = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        authSlice.actions.authStateChange({
          stateChange: true,
        })
      );
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          name: user.displayName,
        })
      );

      
    } 
  });
};


