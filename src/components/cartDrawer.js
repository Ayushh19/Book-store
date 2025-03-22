"use client"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  CircularProgress,
  List,
  ListItem,
  styled,
} from "@mui/material"
import { Close, Add, Remove, ShoppingBag } from "@mui/icons-material"
import { fetchCartItems, removeCartItem, updateCartItemQty } from "../redux/cartSlice"
import { getConsistentBookImage, getRandomBookImage } from "../utils/bookImages"

const QuantityButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "50%",
  padding: theme.spacing(0.5),
  width: "24px",
  height: "24px",
}))

const QuantityInput = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: "30px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(0, 0.5),
  fontSize: "0.875rem",
}))

const StrikethroughText = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
}))

function CartDrawer({ open, onClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, loading, error } = useSelector((state) => state.cart)

  useEffect(() => {
    if (open) {
      dispatch(fetchCartItems())
    }
  }, [dispatch, open])

  const handleQuantityChange = (cartItemId, currentQty, change) => {
    const newQty = Math.max(1, currentQty + change)
    if (newQty !== currentQty) {
      dispatch(updateCartItemQty({ cartItemId, quantity: newQty }))
    }
  }

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeCartItem(cartItemId))
  }

  const handleViewCart = () => {
    navigate("/cart")
    onClose()
  }

  const handleCheckout = () => {
    navigate("/checkout")
    onClose()
  }

  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + (item.product_id?.discountPrice || 0) * item.quantityToBuy,
    0,
  )

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 400 } },
      }}
    >
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">My Cart ({items.length})</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {loading && items.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error && items.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
            <Button variant="outlined" onClick={() => dispatch(fetchCartItems())}>
              Try Again
            </Button>
          </Box>
        ) : items.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <ShoppingBag sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Looks like you haven't added anything to your cart yet.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/")
                onClose()
              }}
              sx={{ mt: 2, bgcolor: "#a52a2a", "&:hover": { bgcolor: "#8B0000" } }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <List disablePadding>
            {items.map((item) => {
              const book = item.product_id
              if (!book) return null

              const imageUrl = getRandomBookImage(book._id)

              return (
                <React.Fragment key={item._id}>
                  <ListItem sx={{ py: 2, px: 0, display: "block" }}>
                    <Box sx={{ display: "flex", mb: 1 }}>
                      {/* Book Image */}
                      <Box
                        component="img"
                        src={imageUrl}
                        alt={book.bookName}
                        sx={{ width: 60, height: 80, objectFit: "contain", mr: 2 }}
                      />

                      {/* Book Details */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" noWrap>
                          {book.bookName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          by {book.author}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                          <Typography variant="subtitle2">Rs. {book.discountPrice}</Typography>
                          <StrikethroughText sx={{ ml: 1 }}>Rs. {book.price}</StrikethroughText>
                        </Box>
                      </Box>
                    </Box>

                    {/* Quantity Controls */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <QuantityButton
                          onClick={() => handleQuantityChange(item._id, item.quantityToBuy, -1)}
                          disabled={item.quantityToBuy <= 1}
                          size="small"
                        >
                          <Remove fontSize="small" />
                        </QuantityButton>
                        <QuantityInput>{item.quantityToBuy}</QuantityInput>
                        <QuantityButton
                          onClick={() => handleQuantityChange(item._id, item.quantityToBuy, 1)}
                          size="small"
                        >
                          <Add fontSize="small" />
                        </QuantityButton>
                      </Box>

                      <Button variant="text" color="inherit" onClick={() => handleRemoveItem(item._id)} size="small">
                        Remove
                      </Button>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              )
            })}
          </List>
        )}
      </Box>

      {items.length > 0 && (
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Total:</Typography>
            <Typography fontWeight="bold">Rs. {totalPrice}</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button variant="outlined" fullWidth onClick={handleViewCart}>
              View Cart
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleCheckout}
              sx={{ bgcolor: "#4285f4", "&:hover": { bgcolor: "#3367d6" } }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      )}
    </Drawer>
  )
}

export default CartDrawer

