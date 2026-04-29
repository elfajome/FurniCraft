import { createSlice } from '@reduxjs/toolkit'
import { servicesFacade } from '../../services'

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.error = null
    },
    setToken(state, action) {
      state.token = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
      state.loading = false
    },
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
    },
  },
})

export const { setUser, setToken, setLoading, setError, logout } = authSlice.actions

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await servicesFacade.auth.login(credentials)
    dispatch(setUser(res?.user ?? res))
    dispatch(setToken(res?.token ?? null))
    return res
  } catch (err) {
    const msg = err?.message || 'Login failed'
    dispatch(setError(msg))
    throw err
  }
}

export const registerUser = (data) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await servicesFacade.auth.register(data)
    dispatch(setUser(res?.user ?? res))
    dispatch(setToken(res?.token ?? null))
    return res
  } catch (err) {
    const msg = err?.message || 'Registration failed'
    dispatch(setError(msg))
    throw err
  }
}

export const logoutUser = () => async (dispatch) => {
  try {
    await servicesFacade.auth.logout()
  } finally {
    dispatch(logout())
  }
}

export default authSlice.reducer
