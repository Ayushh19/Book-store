

"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Container,
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  IconButton,
  CircularProgress,
  Button,
  styled,
} from "@mui/material"
import { Delete as DeleteIcon, Home as HomeIcon } from "@mui/icons-material"
import { getRandomBookImage } from "../utils/bookImages"

const StrikethroughText = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}))

const WishlistItem = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}))

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Function to fetch wishlist items
  const fetchWishlistItems = async () => {
    setLoading(true)
    setError(null)

    try {
      // Get token from localStorage
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
        // Filter out items with null product_id
        const validItems = response.data.result.filter((item) => item.product_id)
        setWishlistItems(validItems)
      } else {
        setWishlistItems([])
      }
    } catch (error) {
      console.error("Error fetching wishlist items:", error)
      setError(error.response?.data?.message || "Failed to fetch wishlist items")

      // Try to load from localStorage as fallback
      const localWishlistIds = JSON.parse(localStorage.getItem("wishlist") || "[]")

      if (localWishlistIds.length > 0) {
        // Create mock wishlist items from local storage IDs
        const mockItems = localWishlistIds.map((id) => ({
          _id: `local-${id}`,
          product_id: {
            _id: id,
            bookName: "Book Title", // You might want to fetch actual book details here
            author: "Author",
            discountPrice: 1000,
            price: 1500,
          },
        }))
        setWishlistItems(mockItems)
      } else {
        // Set mock data for demo purposes
        setWishlistItems([
          {
            _id: "mock-1",
            product_id: {
              _id: "5f4fd116c277b45b384559a5",
              bookName: "Don't Make Me Think",
              author: "Steve Krug",
              discountPrice: 1500,
              price: 2000,
            },
          },
          {
            _id: "mock-2",
            product_id: {
              _id: "5f4fd116c277b45b384559a6",
              bookName: "React Material-UI",
              author: "Cookbook",
              discountPrice: 780,
              price: 1000,
            },
          },
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  // Function to remove item from wishlist
  const handleRemoveItem = async (productId) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("accessToken") || "dummy-token"

      await axios.delete(
        `https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        },
      )

      // Remove item from local state
      setWishlistItems((prevItems) => prevItems.filter((item) => item.product_id._id !== productId))

      // Also remove from localStorage
      const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const updatedWishlist = localWishlist.filter((id) => id !== productId)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    } catch (error) {
      console.error("Error removing wishlist item:", error)
      // For demo purposes, still remove from UI
      setWishlistItems((prevItems) => prevItems.filter((item) => item.product_id._id !== productId))

      // Also remove from localStorage
      const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const updatedWishlist = localWishlist.filter((id) => id !== productId)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    }
  }

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`)
  }

  useEffect(() => {
    // Fetch wishlist items when component mounts
    fetchWishlistItems()
  }, [])

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error && wishlistItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
        <Button variant="contained" onClick={fetchWishlistItems} sx={{ mt: 2 }}>
          Try Again
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
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography color="text.primary">My Wishlist</Typography>
      </Breadcrumbs>

      <Paper sx={{ mb: 4, overflow: "hidden" }}>
        {/* Wishlist Header */}
        <Box sx={{ p: 3, bgcolor: "#f5f5f5" }}>
          <Typography variant="h5" component="h1">
            My Wishlist ({wishlistItems.length})
          </Typography>
        </Box>

        {wishlistItems.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Your wishlist is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Add items to your wishlist to save them for later.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ mt: 2, bgcolor: "#a52a2a", "&:hover": { bgcolor: "#8B0000" } }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Box>
            {wishlistItems.map((item) => {
              // Skip rendering if product_id is null
              if (!item.product_id) return null

              const book = item.product_id
              const imageUrl = getRandomBookImage(book._id)

              return (
                <WishlistItem key={item._id}>
                  {/* Book Image */}
                  <Box
                    component="img"
                    src={imageUrl}
                    alt={book.bookName}
                    sx={{
                      width: 80,
                      height: 110,
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                    onClick={() => handleBookClick(book._id)}
                  />

                  {/* Book Details */}
                  <Box sx={{ ml: 3, flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "normal",
                        mb: 0.5,
                        cursor: "pointer",
                      }}
                      onClick={() => handleBookClick(book._id)}
                    >
                      {book.bookName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      by {book.author}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Rs. {book.discountPrice}
                      </Typography>
                      <StrikethroughText sx={{ ml: 1 }}>Rs. {book.price}</StrikethroughText>
                    </Box>
                  </Box>

                  {/* Remove Button */}
                  <IconButton
                    aria-label="remove from wishlist"
                    onClick={() => handleRemoveItem(book._id)}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </WishlistItem>
              )
            })}
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default WishlistPage

