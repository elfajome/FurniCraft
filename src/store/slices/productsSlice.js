import { createSlice } from '@reduxjs/toolkit'
import { servicesFacade } from '../../services'

const initialState = {
  items: [],
  selectedProduct: null, 
  categories: [],
  loading: false,
  error: null,
}
// productsSlice.js - Manages product-related state, 
// including product list, selected product details, 
// categories, loading status, and error handling. 
// Provides actions and thunks for fetching products and categories from the API.
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload
      state.loading = false
      state.error = null
    },
    setCategories(state, action) {
      state.categories = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
      state.loading = false
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null
    },
  },
})

export const {
  setProducts,
  setSelectedProduct,
  setCategories,
  setLoading,
  setError,
  clearSelectedProduct,
} = productsSlice.actions

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await servicesFacade.products.getProducts()
    const data = Array.isArray(res) ? res : res?.data ?? res?.items ?? []
    dispatch(setProducts(data))
    return data
  } catch (err) {
    dispatch(setError(err.message || 'failed to load products'))
    return []
  }
}

export const fetchProductById = (id) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const product = await servicesFacade.products.getProductById(id)
    dispatch(setSelectedProduct(product))
    return product
  } catch (err) {
    dispatch(setError(err.message || 'failed to load product details'))
    return null
  }
}

export const fetchCategories = () => async (dispatch) => {
  try {
    const categories = await servicesFacade.products.getCategories()
    dispatch(setCategories(Array.isArray(categories) ? categories : []))
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    dispatch(setCategories([]))
  } finally {
    dispatch(setLoading(false))
  }
}

export default productsSlice.reducer
