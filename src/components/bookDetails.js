

"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Rating,
  TextField,
  Breadcrumbs,
  Paper,
  styled,
  CircularProgress,
  IconButton,
} from "@mui/material"
import { Favorite, Home, Add, Remove } from "@mui/icons-material"
import { getBookThumbnails, getBookImage, getRandomBookImage } from "../utils/bookImages"
import { addToCart, addItemLocally } from "../redux/cartSlice"
import axios from "axios"

const RatingBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "#4caf50",
  color: "white",
  borderRadius: "4px",
  padding: "2px 8px",
  fontSize: "14px",
  marginRight: "8px",
}))

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(1),
}))

const QuantityControl = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}))

const QuantityButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "50%",
  padding: theme.spacing(0.5),
}))

const QuantityInput = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(0, 1),
}))

function BookDetail() {
  const { bookId } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [review, setReview] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [wishlistLoading, setWishlistLoading] = useState(false)
const [feedbacks, setFeedbacks] = useState([])
const [feedbackLoading, setFeedbackLoading] = useState(false)
const [feedbackError, setFeedbackError] = useState(null)
const [submitFeedbackLoading, setSubmitFeedbackLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartLoading = useSelector((state) => state.cart.loading)
  const cartError = useSelector((state) => state.cart.error)

  useEffect(() => {
    // Fetch book data
    fetch("https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.result) {
          const foundBook = data.result.find((b) => b._id === bookId)

          if (foundBook) {
            // Create a book object with ID for consistent image assignment
            const bookWithId = {
              id: foundBook._id,
              title: foundBook.bookName,
              author: foundBook.author,
            }

            // Get the main image and thumbnails
            const mainImage = getBookImage(foundBook._id)
            const thumbnails = getBookThumbnails(bookWithId)

            setBook({
              id: foundBook._id,
              title: foundBook.bookName,
              author: foundBook.author,
              rating: 4.5, // Default rating
              reviews: 20, // Default reviews
              price: foundBook.discountPrice,
              originalPrice: foundBook.price,
              description:
                foundBook.description ||
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
              imageUrl: mainImage,
              thumbnails: thumbnails,
              quantity: foundBook.quantity,
            })
          }
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching book details:", error)
        setLoading(false)
      })
  }, [bookId])

useEffect(() => {
  if (book) {
    fetchFeedbacks(book.id)
  }
}, [book])

const fetchFeedbacks = async (productId) => {
  setFeedbackLoading(true)
  setFeedbackError(null)
  try {
    const token = localStorage.getItem("accessToken") || "dummy-token"
    const response = await axios.get(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/get/feedback/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      },
    )
    if (response.data && response.data.result) {
      setFeedbacks(response.data.result)
    } else {
      setFeedbacks([])
    }
  } catch (error) {
    console.error("Error fetching feedback:", error)
    setFeedbackError("Failed to load reviews. Please try again later.")
  } finally {
    setFeedbackLoading(false)
  }
}


const handleSubmitReview = async (e) => {
  e.preventDefault()

  if (!userRating) {
    alert("Please select a rating")
    return
  }

  if (!review.trim()) {
    alert("Please write a review")
    return
  }

  setSubmitFeedbackLoading(true)

  try {
    const token = localStorage.getItem("accessToken") || "dummy-token"

    const response = await axios.post(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/add/feedback/${book.id}`,
      {
        rating: userRating,
        comment: review,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      },
    )

    if (response.data && response.data.success) {
      // Add the new feedback to the list
      const newFeedback = {
        _id: response.data.result?._id || Date.now().toString(),
        rating: userRating,
        comment: review,
        user_id: {
          fullName: "You", // Since we don't know the user's name
        },
      }

      setFeedbacks([newFeedback, ...feedbacks])

      // Reset form
      setUserRating(0)
      setReview("")

      // alert("Review submitted successfully!")
    }
  } catch (error) {
    console.error("Error submitting feedback:", error)
    alert("Failed to submit review. Please try again.")
  } finally {
    setSubmitFeedbackLoading(false)
  }
}


  // Check if book is in wishlist
  useEffect(() => {
    if (book) {
      checkIfInWishlist(book.id)
    }
  }, [book])

  const checkIfInWishlist = async (bookId) => {
    try {
      const token = localStorage.getItem("accessToken") || "dummy-token"

      const response = await axios.get(
        "https://bookstore.incubation.bridgelabz.com/bookstore_user/get_wishlist_items",
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        },
      )

      if (response.data && response.data.result) {
        const isInWishlist = response.data.result.some((item) => item.product_id && item.product_id._id === bookId)
        setIsAddedToWishlist(isInWishlist)
      }
    } catch (error) {
      console.error("Error checking wishlist:", error)

      // Check localStorage as fallback
      const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const isInLocalWishlist = localWishlist.includes(bookId)
      setIsAddedToWishlist(isInLocalWishlist)
    }
  }

  const handleAddToWishlist = async () => {
    if (book && !isAddedToWishlist) {
      setWishlistLoading(true)

      try {
        const token = localStorage.getItem("accessToken") || "dummy-token"

        await axios.post(
          `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${book.id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          },
        )

        setIsAddedToWishlist(true)
        setSnackbarMessage("Added to wishlist")
        setSnackbarOpen(true)

        // Store in localStorage for persistence
        const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
        if (!localWishlist.includes(book.id)) {
          localWishlist.push(book.id)
          localStorage.setItem("wishlist", JSON.stringify(localWishlist))
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error)

        // Still add to localStorage for persistence even if API fails
        setIsAddedToWishlist(true)
        setSnackbarMessage("Added to wishlist")
        setSnackbarOpen(true)

        const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
        if (!localWishlist.includes(book.id)) {
          localWishlist.push(book.id)
          localStorage.setItem("wishlist", JSON.stringify(localWishlist))
        }
      } finally {
        setWishlistLoading(false)
      }
    }
  }


  const handleBackToList = () => {
    navigate("/")
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (book) {
      // Immediately update the local state
      setAddedToCart(true)

      // Try to use the API
      dispatch(addToCart(book.id))
        .unwrap()
        .catch((error) => {
          console.error("Failed to add to cart via API:", error)
          // Fallback to local cart if API fails
          dispatch(addItemLocally({ id: book.id, quantity }))
        })
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!book) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5">Book not found</Typography>
        <Button variant="contained" onClick={handleBackToList} sx={{ mt: 2 }}>
          Back to Book List
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography color="text.primary">Book(77)</Typography>
       
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Left Column - Book Images */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: "flex" }}>
            {/* Thumbnails */}
            <Box sx={{ display: "flex", flexDirection: "column", mr: 2 }}>
              {book.thumbnails.map((thumb, index) => (
                <Box
                  key={index}
                  component="img"
                  src={thumb}
                  alt={`${book.title} thumbnail ${index + 1}`}
                  sx={{
                    width: 60,
                    height: 80,
                    objectFit: "contain",
                    mb: 1,
                    border: index === selectedImage ? "2px solid #a52a2a" : "1px solid #ddd",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </Box>

            {/* Main Image */}
            <Paper elevation={1} sx={{ p: 2, flex: 1, display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                src={book.thumbnails[selectedImage]}
                alt={book.title}
                sx={{
                  maxWidth: "100%",
                  maxHeight: 400,
                  objectFit: "contain",
                }}
              />
            </Paper>
          </Box>

          {/* Quantity Control */}
          {addedToCart && (
            <QuantityControl sx={{ display: "flex", gap: 2, mt: 2,width:"82%",ml:"79px"}}>
              <QuantityButton onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>
                <Remove fontSize="small" />
              </QuantityButton>
              <QuantityInput>
                <Typography>{quantity}</Typography>
              </QuantityInput>
              <QuantityButton onClick={() => handleQuantityChange(quantity + 1)}>
                <Add fontSize="small" />
              </QuantityButton>

              <Button
                variant="contained"
                startIcon={<Favorite />}
                sx={{
                  bgcolor: isAddedToWishlist ? "#555" : "#333",
                  "&:hover": { bgcolor: isAddedToWishlist ? "#555" : "#222" },
                  ml: 2,
                }}
                onClick={handleAddToWishlist}
                disabled={isAddedToWishlist || wishlistLoading}
              >
                {wishlistLoading ? "ADDING..." : isAddedToWishlist ? "ADDED" : "WISHLIST"}
              </Button>
            </QuantityControl>
          )}

          {/* Action Buttons */}
          {!addedToCart && (
            <Box sx={{ display: "flex", gap: 2, mt: 2,width:"82%",ml:"79px"}}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#a52a2a",
                  "&:hover": { bgcolor: "#8B0000" },
                  py: 1.5,
                }}
                onClick={handleAddToCart}
                disabled={cartLoading}
              >
                {cartLoading ? "ADDING..." : "ADD TO BAG"}
              </Button>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Favorite />}
                sx={{
                  bgcolor: isAddedToWishlist ? "#555" : "#333",
                  "&:hover": { bgcolor: isAddedToWishlist ? "#555" : "#222" },
                  py: 1.5,
                }}
                onClick={handleAddToWishlist}
                disabled={isAddedToWishlist || wishlistLoading}
              >
                {wishlistLoading ? "ADDING..." : isAddedToWishlist ? "ADDED" : "WISHLIST"}
              </Button>
            </Box>
          )}

          {cartError && (
            <Typography color="error" sx={{ mt: 1 }}>
              Error: {cartError}
            </Typography>
          )}
        </Grid>

        {/* Right Column - Book Details */}
        <Grid item xs={12} md={7}>
          {/* Book Title and Author */}
          <Typography variant="h4" component="h1" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            by {book.author}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <RatingBadge>{book.rating}</RatingBadge>
            <Typography variant="body2" color="text.secondary">
              ({book.reviews})
            </Typography>
          </Box>

          {/* Price */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Typography variant="h4" component="span">
              Rs.{book.price}
            </Typography>
            <OriginalPrice variant="h6">Rs.{book.originalPrice}</OriginalPrice>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Book Details */}
          <Typography variant="h6" component="h2" gutterBottom>
            • Book Detail
          </Typography>
          <Typography variant="body1" paragraph>
            {book.description}
          </Typography>

          <Divider sx={{ my: 3 }} />
 {/* Customer Feedback */}
 <Typography variant="h6" component="h2" gutterBottom>
 Customer Feedback
</Typography>

<Box component="form" onSubmit={handleSubmitReview} sx={{ mt: 3 }}>
 <Typography variant="subtitle1" gutterBottom>
   Overall rating
 </Typography>
 <Rating
   name="user-rating"
   value={userRating}
   onChange={(event, newValue) => {
     setUserRating(newValue)
   }}
   size="large"
   sx={{ mb: 2 }}
 />

 <TextField
   fullWidth
   multiline
   rows={4}
   placeholder="Write your review"
   value={review}
   onChange={(e) => setReview(e.target.value)}
   sx={{ mb: 2 }}
 />

 <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
   <Button
     type="submit"
     variant="contained"
     disabled={submitFeedbackLoading}
     sx={{
       bgcolor: "#2a7da5",
       "&:hover": { bgcolor: "#1e6a8d" },
     }}
   >
     {submitFeedbackLoading ? "Submitting..." : "Submit"}
   </Button>
 </Box>
</Box>

{/* Display existing feedback */}
<Box sx={{ mt: 4 }}>
 {feedbackLoading ? (
   <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
     <CircularProgress size={24} />
   </Box>
 ) : feedbackError ? (
   <Typography color="error">{feedbackError}</Typography>
 ) : feedbacks.length > 0 ? (
   feedbacks.map((feedback) => (
     <Box key={feedback._id} sx={{ mb: 3, pb: 3, borderBottom: "1px solid #eee" }}>
       <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
         <Box
           sx={{
             width: 32,
             height: 32,
             borderRadius: "50%",
             bgcolor: "#f0f0f0",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             mr: 1,
             color: "#666",
             fontSize: "0.75rem",
           }}
         >
           {feedback.user_id?.fullName?.substring(0, 2).toUpperCase() || "UN"}
         </Box>
         <Typography variant="subtitle2">{feedback.user_id?.fullName || "Anonymous"}</Typography>
       </Box>
       <Rating value={feedback.rating} readOnly size="small" sx={{ mb: 1 }} />
       <Typography variant="body2">{feedback.comment}</Typography>
     </Box>
   ))
 ) : (
   <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
     No reviews yet. Be the first to review this book!
   </Typography>
 )}
</Box>
</Grid>
</Grid>
</Container>
  )
}

export default BookDetail

