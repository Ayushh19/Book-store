


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
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
  Collapse,
} from "@mui/material"
import { Add, Remove, LocationOn, KeyboardArrowDown, Edit } from "@mui/icons-material"
import { fetchCartItems, removeCartItem, updateCartItemQty } from "../redux/cartSlice"
import { getRandomBookImage } from "../utils/bookImages"

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

const AddressBox = styled(Box)(({ theme }) => ({
  border: "1px solid #DBDBDB",
  borderRadius: "4px",
  padding: "16px",
  backgroundColor: "#f9f9f9",
  marginBottom: theme.spacing(2),
}))

const AddressTypeLabel = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}))

const AddressTypeDot = styled(Box)(({ theme }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: "#d32f2f",
  marginRight: theme.spacing(1),
}))

const SectionPaper = styled(Paper)(({ theme, active }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  opacity: active ? 1 : 0.7,
  transition: "opacity 0.3s ease",
}))

function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items = [], loading, error, localCart = [] } = useSelector((state) => state.cart || {})
  const [address, setAddress] = useState("At post - Nere , Tal - Panvel , Dist - Raigad...")
  const [activeSection, setActiveSection] = useState("cart") // cart, address, summary
  const [selectedAddress, setSelectedAddress] = useState("work")

  // Form fields
  const [fullName, setFullName] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [workAddress, setWorkAddress] = useState(
    "",
  )
  const [homeAddress, setHomeAddress] = useState(
    "At post - Nere , Tal - Panvel , Dist - Raigad...",
  )
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

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
    setActiveSection("address")
    // window.scrollTo(0, 0)
  }

  const handleContinueToSummary = () => {
    setActiveSection("summary")
    // window.scrollTo(0, 0)
  }

  const handleCheckout = () => {
    // Implement checkout logic
    console.log("Proceeding to checkout...")
    alert("Order placed successfully!")
    navigate("/")
  }

  // Combine API items and local cart items
  const allItems =
    Array.isArray(items) && items.length > 0 ? items : Array.isArray(localCart) && localCart.length > 0 ? localCart : []

  if (loading && allItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error && allItems.length === 0) {
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

  if (allItems.length === 0) {
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
  const totalItems = allItems.reduce((total, item) => total + (item.quantityToBuy || item.quantity || 0), 0)
  const totalPrice = allItems.reduce((total, item) => {
    const price = item.product_id?.discountPrice || 100 // Default price if not available
    const qty = item.quantityToBuy || item.quantity || 0
    return total + price * qty
  }, 0)

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
      <SectionPaper active={activeSection === "cart"}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">My cart ({totalItems})</Typography>
          <LocationBox>
            <LocationOn color="error" sx={{ mr: 1 }} />
            <Typography variant="body2">{address}</Typography>
            <KeyboardArrowDown sx={{ ml: 1, color: "text.secondary" }} />
          </LocationBox>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {allItems.map((item) => {
          // Handle both API items and local items
          const book = item.product_id || {
            _id: item.id,
            bookName: "Book",
            author: "Author",
            discountPrice: 100,
            price: 150,
          }

          const imageUrl = getRandomBookImage(book._id)
          const itemId = item._id || `local-${book._id}`
          const quantity = item.quantityToBuy || item.quantity || 1

          return (
            <Box key={itemId} sx={{ mb: 3, display: "flex", alignItems: "flex-start" }}>
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
                  <QuantityButton onClick={() => handleQuantityChange(itemId, quantity, -1)} disabled={quantity <= 1}>
                    <Remove fontSize="small" />
                  </QuantityButton>
                  <QuantityInput>
                    <Typography>{quantity}</Typography>
                  </QuantityInput>
                  <QuantityButton onClick={() => handleQuantityChange(itemId, quantity, 1)}>
                    <Add fontSize="small" />
                  </QuantityButton>

                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => handleRemoveItem(itemId)}
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
      </SectionPaper>

      {/* Customer Details */}
      <SectionPaper active={activeSection === "address"}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6">Address Details</Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{
              borderColor: "#d32f2f",
              color: "#d32f2f",
              textTransform: "none",
              borderRadius: "4px",
              px: 2,
            }}
          >
            Add New Address
          </Button>
        </Box>

        <Collapse in={activeSection === "address"}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ bgcolor: "#f9f9f9" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Mobile Number
              </Typography>
              <TextField
                fullWidth
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ bgcolor: "#f9f9f9" }}
              />
            </Grid>
          </Grid>

          <FormControl component="fieldset" sx={{ width: "100%" }}>
            <RadioGroup value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
              <FormControlLabel
                value="work"
                control={<Radio sx={{ color: "#d32f2f", "&.Mui-checked": { color: "#d32f2f" } }} />}
                label={
                  <Box sx={{ width: "100%" }}>
                    <AddressTypeLabel>
                      <AddressTypeDot />
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        1.WORK
                      </Typography>
                      <Button
                        startIcon={<Edit />}
                        sx={{ ml: 1, color: "#d32f2f", textTransform: "none", minWidth: "auto", p: 0 }}
                      >
                        Edit
                      </Button>
                    </AddressTypeLabel>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Address
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={workAddress}
                      onChange={(e) => setWorkAddress(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ bgcolor: "#f9f9f9", mb: 2 }}
                    />

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          City/Town
                        </Typography>
                        <TextField
                          fullWidth
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ bgcolor: "#f9f9f9" }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          State
                        </Typography>
                        <TextField
                          fullWidth
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ bgcolor: "#f9f9f9" }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                }
                sx={{ alignItems: "flex-start", mb: 2 }}
              />

              <FormControlLabel
                value="home"
                control={<Radio sx={{ color: "#d32f2f", "&.Mui-checked": { color: "#d32f2f" } }} />}
                label={
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      2.Home
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {homeAddress}
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start" }}
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleContinueToSummary}
              sx={{
                bgcolor: "#4285f4",
                "&:hover": { bgcolor: "#3367d6" },
                px: 4,
                py: 1,
                textTransform: "uppercase",
              }}
            >
              CONTINUE
            </Button>
          </Box>
        </Collapse>
      </SectionPaper>

      {/* Order Summary */}
      <SectionPaper active={activeSection === "summary"}>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Collapse in={activeSection === "summary"}>
          {allItems.map((item) => {
            // Just show the first item for simplicity
            const book = item.product_id || {
              _id: item.id,
              bookName: "Don't Make Me Think",
              author: "Steve Krug",
              discountPrice: 1500,
              price: 2000,
            }

            const imageUrl = getRandomBookImage(book._id)

            return (
              <Box key={item._id || book._id} sx={{ display: "flex", mb: 3 }}>
                <Box
                  component="img"
                  src={imageUrl}
                  alt={book.bookName}
                  sx={{ width: 80, height: 110, objectFit: "contain", mr: 3 }}
                />
                <Box>
                  <Typography variant="subtitle1">{book.bookName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {book.author}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Rs. {book.discountPrice}
                  </Typography>
                </Box>
              </Box>
            )
          })}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleCheckout}
              sx={{
                bgcolor: "#4285f4",
                "&:hover": { bgcolor: "#3367d6" },
                px: 4,
                py: 1,
                textTransform: "uppercase",
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Collapse>
      </SectionPaper>
    </Container>
  )
}

export default CartPage
