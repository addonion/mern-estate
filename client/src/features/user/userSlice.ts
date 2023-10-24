import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null as null | object,
  error: null as null | string,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action: PayloadAction<object>) => {
      state.loading = false,
      state.error = null,
      state.currentUser = action.payload
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false,
      state.error = action.payload
    }
  }
})

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions

export default userSlice.reducer