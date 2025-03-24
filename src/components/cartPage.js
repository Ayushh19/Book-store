"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Divider,
  CircularProgress,
  Breadcrumbs,
  styled,
} from "@mui/material"
import { Add, Remove, LocationOn, KeyboardArrowDown } from "@mui/icons-material"
import { fetchCartItems, removeCartItem, updateCartItemQty } from "../redux/cartSlice"
import { getRandomBookImage} from "../utils/bookImages"

const QuantityButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "50%",
  padding: 0,
  minWidth: "30px",
  width: "30px",
  height: "30px",
}))

const QuantityInput = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: "40px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(0, 1),
}))

const StrikethroughText = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}))

const LocationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid #DBDBDB",
  borderRadius: "4px",
  padding: "8px 16px",
  cursor: "pointer",
}))

function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, loading, error } = useSelector((state) => state.cart)
  const [address, setAddress] = useState("At post - Nere , Tal - Panvel , Dist...")

  useEffect(() => {
    // Fetch cart items when component mounts
    dispatch(fetchCartItems())
  }, [dispatch])

  const handleQuantityChange = (cartItemId, currentQty, change) => {
    const newQty = Math.max(1, currentQty + change)
    if (newQty !== currentQty) {
      dispatch(updateCartItemQty({ cartItemId, quantity: newQty }))
    }
  }

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeCartItem(cartItemId))
  }

  const handlePlaceOrder = () => {
    // Navigate to checkout or implement order placement logic
    console.log("Placing order...")
    // navigate('/checkout');
  }

  if (loading && items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error && items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
        <Button variant="contained" onClick={() => dispatch(fetchCartItems())} sx={{ mt: 2 }}>
          Try Again
        </Button>
      </Container>
    )
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Typography color="text.primary">My cart</Typography>
        </Breadcrumbs>
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ mt: 2, bgcolor: "#a52a2a", "&:hover": { bgcolor: "#8B0000" } }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    )
  }

  // Calculate total items and total price
  const totalItems = items.reduce((total, item) => total + item.quantityToBuy, 0)
  const totalPrice = items.reduce(
    (total, item) => total + (item.product_id?.discountPrice || 0) * item.quantityToBuy,
    0,
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: "white" }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
        <Typography color="text.primary">My cart</Typography>
      </Breadcrumbs>

      {/* Cart Items */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">My cart ({totalItems})</Typography>
          <LocationBox>
            <LocationOn color="error" sx={{ mr: 1 }} />
            <Typography variant="body2">{address}</Typography>
            <KeyboardArrowDown sx={{ ml: 1, color: "text.secondary" }} />
          </LocationBox>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {items.map((item) => {
          const book = item.product_id
          if (!book) return null

          const imageUrl = getRandomBookImage(book._id)

          return (
            <Box key={item._id} sx={{ mb: 3, display: "flex", alignItems: "flex-start" }}>
              {/* Book Image */}
              <Box
                component="img"
                src={imageUrl}
                alt={book.bookName}
                sx={{ width: 80, height: 110, objectFit: "contain", mr: 3 }}
              />

              {/* Book Details */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "normal", mb: 0.5 }}>
                  {book.bookName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  by {book.author}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "normal" }}>
                    Rs. {book.discountPrice}
                  </Typography>
                  <StrikethroughText sx={{ ml: 1 }}>Rs. {book.price}</StrikethroughText>
                </Box>

                {/* Quantity Controls */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <QuantityButton
                    onClick={() => handleQuantityChange(item._id, item.quantityToBuy, -1)}
                    disabled={item.quantityToBuy <= 1}
                  >
                    <Remove fontSize="small" />
                  </QuantityButton>
                  <QuantityInput>
                    <Typography>{item.quantityToBuy}</Typography>
                  </QuantityInput>
                  <QuantityButton onClick={() => handleQuantityChange(item._id, item.quantityToBuy, 1)}>
                    <Add fontSize="small" />
                  </QuantityButton>

                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => handleRemoveItem(item._id)}
                    sx={{ ml: 2, textTransform: "none", color: "#9D9D9D" }}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            </Box>
          )
        })}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            onClick={handlePlaceOrder}
            sx={{
              bgcolor: "#4285f4",
              "&:hover": { bgcolor: "#3367d6" },
              px: 4,
              py: 1,
              textTransform: "uppercase",
            }}
          >
            PLACE ORDER
          </Button>
        </Box>
      </Paper>

      {/* Address Details */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h6" gutterBottom>
          Address Details
        </Typography>
      </Paper>

      {/* Order Summary */}
      <Paper sx={{ p: 3, boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h6" gutterBottom>
          Order summery
        </Typography>
      </Paper>
    </Container>
  )
}

export default CartPage

