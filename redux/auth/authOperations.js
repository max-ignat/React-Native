import { async } from "@firebase/util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import db from '../../firebase/config'
// const auth = getAuth(app);

// export const signup = () => async (dispatch, getState) => { };
// export const signin = () => async (dispatch, getState) => { };
// export const logout = () => async (dispatch, getState) => { };
export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const result = await db.auth().createUserWithEmailAndPassword() ;
        console.log(data);
        console.log(result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
