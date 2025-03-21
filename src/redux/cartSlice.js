import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk for adding item to cart
export const addToCart = createAsyncThunk("cart/addToCart", async (bookId, { rejectWithValue }) => {
  try {
    // Get token from localStorage (in a real app, you'd have proper auth)
    const token = localStorage.getItem("accessToken") || "dummy-token"

    const response = await fetch(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to add to cart")
    }

    return data
  } catch (error) {
    return rejectWithValue(error.message || "An error occurred")
  }
})

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // For local testing without API
    addItemLocally: (state, action) => {
      const { id, quantity = 1 } = action.payload
      const existingItem = state.items.find((item) => item.id === id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ id, quantity })
      }

      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
    },
    updateCartCount: (state, action) => {
      state.totalItems = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        // Assuming the API returns the updated cart with all items
        // Update the cart count based on API response
        if (action.payload && action.payload.result) {
          // If API returns the full cart, update items and count
          state.items = action.payload.result.items || []
          state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
        } else {
          // If API doesn't return full cart, just increment the count
          state.totalItems += 1
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to add to cart"
      })
  },
})

export const { addItemLocally, updateCartCount } = cartSlice.actions
export default cartSlice.reducer

