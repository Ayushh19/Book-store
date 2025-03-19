


"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
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
} from "@mui/material"
import { Favorite, Home } from "@mui/icons-material"
import { getBookImage, getBookThumbnails, getRandomBookImage } from "../utils/bookImages"

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

function BookDetail() {
  const { bookId } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [review, setReview] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch book data
    fetch("https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.result) {
          const foundBook = data.result.find((b) => b._id === bookId)
          if (foundBook) {
            // Create a temporary book object to check for image matches
            const tempBook = {
              title: foundBook.bookName,
              author: foundBook.author,
            }

            // Get the appropriate image or a random one if no match
            const mainImage = getBookImage(tempBook) || getRandomBookImage()
            const thumbnails = getBookThumbnails(tempBook)

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

  const handleBackToList = () => {
    navigate("/dashboard")
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    console.log("Review submitted:", { rating: userRating, review })
    // Reset form
    setUserRating(0)
    setReview("")
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
        <Box
          component="button"
          onClick={handleBackToList}
          sx={{
            display: "flex",
            alignItems: "center",
            color: "inherit",
            textDecoration: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit",
            fontFamily: "inherit",
            p: 0,
          }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Box>
        <Typography color="text.primary">Book({book.id.substring(0, 2)})</Typography>
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

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#a52a2a",
                "&:hover": { bgcolor: "#8B0000" },
                py: 1.5,
              }}
            >
              ADD TO BAG
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Favorite />}
              sx={{
                bgcolor: "#333",
                "&:hover": { bgcolor: "#222" },
                py: 1.5,
              }}
            >
              WISHLIST
            </Button>
          </Box>
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
                sx={{
                  bgcolor: "#2a7da5",
                  "&:hover": { bgcolor: "#1e6a8d" },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default BookDetail

