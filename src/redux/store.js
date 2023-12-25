import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './MenuSlice'

export default configureStore({
  reducer: {
    menu: menuReducer
  }
})