import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
export interface UserState {
  id: number
  name: string
  email: string
  phone: string
  address: string
}
const initialState = {
  id: 1, // for the purpuse of this test assigment everyone is user 1
  name: "",
  email: "",
  phone: "",
  address: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload
    },
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    },
  },
})

export const { setId, setName, setEmail, setPhone, setAddress } =
  userSlice.actions
export const selectUserId = (state: RootState) => state.user.id
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer
