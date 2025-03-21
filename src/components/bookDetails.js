

// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import {
//   Container,
//   Grid,
//   Box,
//   Typography,
//   Button,
//   Divider,
//   Rating,
//   TextField,
//   Breadcrumbs,
//   Paper,
//   styled,
//   CircularProgress,
// } from "@mui/material"
// import { Favorite, Home } from "@mui/icons-material"
// import { getBookImage, getBookThumbnails, getRandomBookImage } from "../utils/bookImages"

// const RatingBadge = styled(Box)(({ theme }) => ({
//   display: "inline-flex",
//   alignItems: "center",
//   backgroundColor: "#4caf50",
//   color: "white",
//   borderRadius: "4px",
//   padding: "2px 8px",
//   fontSize: "14px",
//   marginRight: "8px",
// }))

// const OriginalPrice = styled(Typography)(({ theme }) => ({
//   textDecoration: "line-through",
//   color: theme.palette.text.secondary,
//   marginLeft: theme.spacing(1),
// }))

// function BookDetail() {
//   const { bookId } = useParams()
//   const [book, setBook] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [userRating, setUserRating] = useState(0)
//   const [review, setReview] = useState("")
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [isAddedToWishlist, setIsAddedToWishlist] = useState(false) // State to track if book is added to wishlist
//   const navigate = useNavigate()

//   useEffect(() => {
//     // Fetch book data
//     fetch("https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book")
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success && data.result) {
//           const foundBook = data.result.find((b) => b._id === bookId)
//           if (foundBook) {
//             // Create a temporary book object to check for image matches
//             const tempBook = {
//               title: foundBook.bookName,
//               author: foundBook.author,
//             }

//             // Get the appropriate image or a random one if no match
//             const mainImage = getBookImage(tempBook) || getRandomBookImage()
//             const thumbnails = getBookThumbnails(tempBook)

//             setBook({
//               id: foundBook._id,
//               title: foundBook.bookName,
//               author: foundBook.author,
//               rating: 4.5, // Default rating
//               reviews: 20, // Default reviews
//               price: foundBook.discountPrice,
//               originalPrice: foundBook.price,
//               description:
//                 foundBook.description ||
//                 "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
//               imageUrl: mainImage,
//               thumbnails: thumbnails,
//               quantity: foundBook.quantity,
//             })
//           }
//         }
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.error("Error fetching book details:", error)
//         setLoading(false)
//       })
//   }, [bookId])

//   const handleBackToList = () => {
//     navigate("/dashboard")
//   }

//   const handleSubmitReview = (e) => {
//     e.preventDefault()
//     console.log("Review submitted:", { rating: userRating, review })
//     // Reset form
//     setUserRating(0)
//     setReview("")
//   }

//   const handleAddToWishlist = async () => {
//     try {
//       // Retrieve the token from local storage
//       const token = localStorage.getItem("accessToken")
//       console.log("Token from localStorage:", token) // Debugging: Log the token

//       if (!token) {
//         console.error("No token found. User is not authenticated.")
//         return
//       }

//       // Log the headers for debugging
//       console.log("Request Headers:", {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       })

//       const response = await fetch(
//         `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${bookId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-access-token": ` ${token}`, // Add the token to the headers
//           },
//         }
//       )

//       // Log the response status and data
//       console.log("Response Status:", response.status)
//       const data = await response.json()
//       console.log("Response Data:", data)

//       if (response.ok) {
//         console.log("Book added to wishlist successfully:", data)
//         setIsAddedToWishlist(true) // Update state to indicate book is added to wishlist
//       } else {
//         console.error("Failed to add book to wishlist:", data.message)
//       }
//     } catch (error) {
//       console.error("An error occurred while adding to wishlist:", error)
//     }
//   }

//   if (loading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 8, display: "flex", justifyContent: "center" }}>
//         <CircularProgress />
//       </Container>
//     )
//   }

//   if (!book) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         <Typography variant="h5">Book not found</Typography>
//         <Button variant="contained" onClick={handleBackToList} sx={{ mt: 2 }}>
//           Back to Book List
//         </Button>
//       </Container>
//     )
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Breadcrumb Navigation */}
//       <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
//         <Box
//           component="button"
//           onClick={handleBackToList}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             color: "inherit",
//             textDecoration: "none",
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             fontSize: "inherit",
//             fontFamily: "inherit",
//             p: 0,
//           }}
//         >
//           <Home sx={{ mr: 0.5 }} fontSize="inherit" />
//           Home
//         </Box>
//         <Typography color="text.primary">Book(57)</Typography>
//         {/* <Typography color="text.primary">Book({book.id.substring(0, 2)})</Typography> */}
//       </Breadcrumbs>

//       <Grid container spacing={4}>
//         {/* Left Column - Book Images */}
//         <Grid item xs={12} md={5}>
//           <Box sx={{ display: "flex" }}>
//             {/* Thumbnails */}
//             <Box sx={{ display: "flex", flexDirection: "column", mr: 2 }}>
//               {book.thumbnails.map((thumb, index) => (
//                 <Box
//                   key={index}
//                   component="img"
//                   src={thumb}
//                   alt={`${book.title} thumbnail ${index + 1}`}
//                   sx={{
//                     width: 60,
//                     height: 80,
//                     objectFit: "contain",
//                     mb: 1,
//                     border: index === selectedImage ? "2px solid #a52a2a" : "1px solid #ddd",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => setSelectedImage(index)}
//                 />
//               ))}
//             </Box>

//             {/* Main Image */}
//             <Paper elevation={1} sx={{ p: 2, flex: 1, display: "flex", justifyContent: "center" }}>
//               <Box
//                 component="img"
//                 src={book.thumbnails[selectedImage]}
//                 alt={book.title}
//                 sx={{
//                   maxWidth: "100%",
//                   maxHeight: 400,
//                   objectFit: "contain",
//                 }}
//               />
//             </Paper>
//           </Box>

//           {/* Action Buttons */}
//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 bgcolor: "#a52a2a",
//                 "&:hover": { bgcolor: "#8B0000" },
//                 py: 1.5,
//               }}
//             >
//               ADD TO BAG
//             </Button>
//             <Button
//               variant="contained"
//               fullWidth
//               startIcon={<Favorite />}
//               sx={{
//                 bgcolor: "#333",
//                 "&:hover": { bgcolor: "#222" },
//                 py: 1.5,
//               }}
//               onClick={handleAddToWishlist}
//               disabled={isAddedToWishlist} // Disable button after adding to wishlist
//             >
//               {isAddedToWishlist ? "Added" : "WISHLIST"} {/* Change button text */}
//             </Button>
//           </Box>
//         </Grid>

//         {/* Right Column - Book Details */}
//         <Grid item xs={12} md={7}>
//           {/* Book Title and Author */}
//           <Typography variant="h4" component="h1" gutterBottom>
//             {book.title}
//           </Typography>
//           <Typography variant="h6" color="text.secondary" gutterBottom>
//             by {book.author}
//           </Typography>

//           {/* Rating */}
//           <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//             <RatingBadge>{book.rating}</RatingBadge>
//             <Typography variant="body2" color="text.secondary">
//               ({book.reviews})
//             </Typography>
//           </Box>

//           {/* Price */}
//           <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//             <Typography variant="h4" component="span">
//               Rs.{book.price}
//             </Typography>
//             <OriginalPrice variant="h6">Rs.{book.originalPrice}</OriginalPrice>
//           </Box>

//           <Divider sx={{ my: 3 }} />

//           {/* Book Details */}
//           <Typography variant="h6" component="h2" gutterBottom>
//             • Book Detail
//           </Typography>
//           <Typography variant="body1" paragraph>
//             {book.description}
//           </Typography>

//           <Divider sx={{ my: 3 }} />

//           {/* Customer Feedback */}
//           <Typography variant="h6" component="h2" gutterBottom>
//             Customer Feedback
//           </Typography>

//           <Box component="form" onSubmit={handleSubmitReview} sx={{ mt: 3 }}>
//             <Typography variant="subtitle1" gutterBottom>
//               Overall rating
//             </Typography>
//             <Rating
//               name="user-rating"
//               value={userRating}
//               onChange={(event, newValue) => {
//                 setUserRating(newValue)
//               }}
//               size="large"
//               sx={{ mb: 2 }}
//             />

//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               placeholder="Write your review"
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               sx={{ mb: 2 }}
//             />

//             <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   bgcolor: "#2a7da5",
//                   "&:hover": { bgcolor: "#1e6a8d" },
//                 }}
//               >
//                 Submit
//               </Button>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   )
// }

// export default BookDetail



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
import { getBookImage, getBookThumbnails, getRandomBookImage } from "../utils/bookImages"
import { addToCart, addItemLocally } from "../redux/cartSlice"

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
    navigate("/")
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    console.log("Review submitted:", { rating: userRating, review })
    // Reset form
    setUserRating(0)
    setReview("")
  }

  const handleAddToWishlist = () => {
    setIsAddedToWishlist(true)
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (book) {
      // Try to use the API
      dispatch(addToCart(book.id))
        .unwrap()
        .then(() => {
          setAddedToCart(true)
        })
        .catch((error) => {
          console.error("Failed to add to cart via API:", error)
          // Fallback to local cart if API fails
          dispatch(addItemLocally({ id: book.id, quantity }))
          setAddedToCart(true)
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
        <Typography color="text.primary">Book(57)</Typography>
        {/* <Typography color="text.primary">Book({book.id.substring(0, 2)})</Typography> */}
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
            <QuantityControl>
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
                  bgcolor: "#333",
                  "&:hover": { bgcolor: "#222" },
                  ml: 2,
                }}
                onClick={handleAddToWishlist}
                disabled={isAddedToWishlist}
              >
                {isAddedToWishlist ? "ADDED" : "WISHLIST"}
              </Button>
            </QuantityControl>
          )}

          {/* Action Buttons */}
          {!addedToCart && (
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
                  bgcolor: "#333",
                  "&:hover": { bgcolor: "#222" },
                  py: 1.5,
                }}
                onClick={handleAddToWishlist}
                disabled={isAddedToWishlist}
              >
                {isAddedToWishlist ? "ADDED" : "WISHLIST"}
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

