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

// Async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (_, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("accessToken") || "dummy-token"

    const response = await fetch("https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to fetch cart items")
    }

    return data
  } catch (error) {
    return rejectWithValue(error.message || "An error occurred")
  }
})

// Async thunk for removing cart item
export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (cartItemId, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("accessToken") || "dummy-token"

    const response = await fetch(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${cartItemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      },
    )

    const data = await response.json()

    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to remove cart item")
    }

    return { ...data, cartItemId }
  } catch (error) {
    return rejectWithValue(error.message || "An error occurred")
  }
})

// Async thunk for updating cart item quantity
export const updateCartItemQty = createAsyncThunk(
  "cart/updateCartItemQty",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("accessToken") || "dummy-token"

      const response = await fetch(
        `https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${cartItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ quantityToBuy: quantity }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update cart item quantity")
      }

      return { ...data, cartItemId, quantity }
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred")
    }
  },
)

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

      // Immediately increment the total count
      state.totalItems += quantity

      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ id, quantity })
      }
    },
    updateCartCount: (state, action) => {
      state.totalItems = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false

        // Immediately increment the count regardless of API response details
        state.totalItems += 1

        // If API returns the full cart, update items
        if (action.payload && action.payload.result) {
          state.items = action.payload.result.items || []
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to add to cart"
      })

      // Fetch cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload && action.payload.result) {
          state.items = action.payload.result || []
          state.totalItems = state.items.reduce((total, item) => total + item.quantityToBuy, 0)
        }
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch cart items"
      })

      // Remove cart item
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false
        // Remove the item from the cart
        state.items = state.items.filter((item) => item._id !== action.payload.cartItemId)
        // Update total items count
        state.totalItems = state.items.reduce((total, item) => total + item.quantityToBuy, 0)
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to remove cart item"
      })

      // Update cart item quantity
      .addCase(updateCartItemQty.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.loading = false
        // Update the quantity of the item
        const item = state.items.find((item) => item._id === action.payload.cartItemId)
        if (item) {
          item.quantityToBuy = action.payload.quantity
        }
        // Update total items count
        state.totalItems = state.items.reduce((total, item) => total + item.quantityToBuy, 0)
      })
      .addCase(updateCartItemQty.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to update cart item quantity"
      })
  },
})

export const { addItemLocally, updateCartCount } = cartSlice.actions
export default cartSlice.reducer

