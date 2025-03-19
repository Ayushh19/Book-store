



// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { Container, Typography, Grid, Box, FormControl, Select, MenuItem, InputLabel, Pagination } from "@mui/material"
// import BookCard from "./bookCard"

// function BookList() {
//   const [books, setBooks] = useState([])
//   const [sortBy, setSortBy] = useState("relevance")
//   const [page, setPage] = useState(1)
//   const [loading, setLoading] = useState(true)
//   const booksPerPage = 12 // Changed to 12 as requested
//   const navigate = useNavigate()

//   useEffect(() => {
//     // Fetch books data
//     fetch("https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book")
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success && data.result) {
//           setBooks(data.result)
//         }
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.error("Error fetching books:", error)
//         setLoading(false)
//       })
//   }, [])

//   const handleSortChange = (event) => {
//     setSortBy(event.target.value)
//     setPage(1) // Reset to first page when sorting changes
//   }

//   const handlePageChange = (event, value) => {
//     setPage(value)
//   }

//   const handleBookClick = (bookId) => {
//     navigate(`book/${bookId}`)
//   }

//   // Calculate pagination
//   const totalBooks = books.length
//   const totalPages = Math.ceil(totalBooks / booksPerPage)
//   const startIndex = (page - 1) * booksPerPage
//   const endIndex = startIndex + booksPerPage

//   // Sort books based on selected option
//   const getSortedBooks = () => {
//     const sortedBooks = [...books]
//     switch (sortBy) {
//       case "price-low":
//         return sortedBooks.sort((a, b) => a.discountPrice - b.discountPrice)
//       case "price-high":
//         return sortedBooks.sort((a, b) => b.discountPrice - a.discountPrice)
//       case "newest":
//         return sortedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       default:
//         return sortedBooks
//     }
//   }

//   // Get current page books
//   const currentBooks = getSortedBooks().slice(startIndex, endIndex)

//   // Transform book data to match our BookCard component props
//   const transformBookData = (book) => ({
//     id: book._id,
//     title: book.bookName,
//     author: book.author,
//     rating: 4.5, // Default rating since it's not in the API data
//     reviews: 20, // Default reviews since it's not in the API data
//     price: book.discountPrice,
//     originalPrice: book.price,
//     imageUrl: book.bookImage || `/placeholder.svg?height=200&width=150`, // Use placeholder if no image
//     outOfStock: book.quantity === 0,
//   })

//   if (loading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Typography>Loading books...</Typography>
//       </Container>
//     )
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//         <Typography variant="h4" component="h1">
//           Books{" "}
//           <Typography component="span" color="text.secondary">
//             ({totalBooks} items)
//           </Typography>
//         </Typography>

//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel id="sort-select-label">Sort by</InputLabel>
//           <Select
//             labelId="sort-select-label"
//             id="sort-select"
//             value={sortBy}
//             label="Sort by"
//             onChange={handleSortChange}
//             size="small"
//           >
//             <MenuItem value="relevance">Relevance</MenuItem>
//             <MenuItem value="price-low">Price: Low to High</MenuItem>
//             <MenuItem value="price-high">Price: High to Low</MenuItem>
//             <MenuItem value="newest">Newest First</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       <Grid container spacing={3}>
//         {currentBooks.map((book) => (
//           <Grid item key={book._id} xs={12} sm={6} md={3} onClick={() => handleBookClick(book._id)}>
//             <div style={{ cursor: "pointer" }}>
//               <BookCard book={transformBookData(book)} />
//             </div>
//           </Grid>
//         ))}
//       </Grid>

//       {totalPages > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
//         </Box>
//       )}
//     </Container>
//   )
// }

// export default BookList


"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Typography, Grid, Box, FormControl, Select, MenuItem, InputLabel, Pagination } from "@mui/material"
import BookCard from "./bookCard"
import { getBookImage, getRandomBookImage } from "../utils/bookImages"

function BookList() {
  const [books, setBooks] = useState([])
  const [sortBy, setSortBy] = useState("relevance")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const booksPerPage = 12 // Changed to 12 as requested
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch books data
    fetch("https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.result) {
          // Assign a random image to each book that doesn't have specific matches
          const booksWithImages = data.result.map((book) => {
            // Create a temporary book object to check for image matches
            const tempBook = {
              title: book.bookName,
              author: book.author,
            }

            // Get the appropriate image or a random one if no match
            const imageUrl = getBookImage(tempBook) || getRandomBookImage()

            return {
              ...book,
              imageUrl,
            }
          })

          setBooks(booksWithImages)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching books:", error)
        setLoading(false)
      })
  }, [])

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
    setPage(1) // Reset to first page when sorting changes
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleBookClick = (bookId) => {
    navigate(`book/${bookId}`)
  }

  // Calculate pagination
  const totalBooks = books.length
  const totalPages = Math.ceil(totalBooks / booksPerPage)
  const startIndex = (page - 1) * booksPerPage
  const endIndex = startIndex + booksPerPage

  // Sort books based on selected option
  const getSortedBooks = () => {
    const sortedBooks = [...books]
    switch (sortBy) {
      case "price-low":
        return sortedBooks.sort((a, b) => a.discountPrice - b.discountPrice)
      case "price-high":
        return sortedBooks.sort((a, b) => b.discountPrice - a.discountPrice)
      case "newest":
        return sortedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      default:
        return sortedBooks
    }
  }

  // Get current page books
  const currentBooks = getSortedBooks().slice(startIndex, endIndex)

  // Transform book data to match our BookCard component props
  const transformBookData = (book) => {
    return {
      id: book._id,
      title: book.bookName,
      author: book.author,
      rating: 4.5, // Default rating since it's not in the API data
      reviews: 20, // Default reviews since it's not in the API data
      price: book.discountPrice,
      originalPrice: book.price,
      imageUrl: book.imageUrl, // Use the image we assigned in useEffect
      outOfStock: book.quantity === 0,
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading books...</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Books{" "}
          <Typography component="span" color="text.secondary">
            ({totalBooks} items)
          </Typography>
        </Typography>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortBy}
            label="Sort by"
            onChange={handleSortChange}
            size="small"
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="newest">Newest First</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {currentBooks.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={3} onClick={() => handleBookClick(book._id)}>
            <div style={{ cursor: "pointer" }}>
              <BookCard book={transformBookData(book)} />
            </div>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      )}
    </Container>
  )
}

export default BookList

