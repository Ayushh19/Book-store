



"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Container, Typography, Grid, Box, FormControl, Select, MenuItem, InputLabel, Pagination } from "@mui/material"
import BookCard from "./bookCard"
import { getBookImage,getConsistentBookImage, getRandomBookImage } from "../utils/bookImages"

function BookList() {
  const [books, setBooks] = useState([])
  const [sortBy, setSortBy] = useState("relevance")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const booksPerPage = 12 // Changed to 12 as requested
  const navigate = useNavigate()

  const searchQuery = useSelector((state) => state.search.query)

  useEffect(() => {
    // Fetch books data
    fetch("https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.result) {
          // Assign a random image to each book that doesn't have specific matches
          const booksWithImages = data.result.map((book) => {
        
            // Get the appropriate image or a random one if no match
            const imageUrl = getConsistentBookImage(book._id)

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

  // Filter books based on search query
  const filteredBooks = searchQuery
    ? books.filter((book) => book.bookName.toLowerCase().includes(searchQuery.toLowerCase()))
    : books

  // Sort filtered books based on selected option
  const getSortedBooks = () => {
    const sortedBooks = [...filteredBooks]
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

  // Calculate pagination
  const totalBooks = books.length
  const totalPages = Math.ceil(totalBooks / booksPerPage)
  const startIndex = (page - 1) * booksPerPage
  const endIndex = startIndex + booksPerPage
  const sortedBooks = getSortedBooks()
  const totalFilteredBooks = sortedBooks.length
  const totalFilteredPages = Math.ceil(totalFilteredBooks / booksPerPage)

 

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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, padding: 2.15 }}>
        <Typography variant="h4" component="h1">
          Books{" "}
<Typography component="span" color="text.secondary">
            ({totalFilteredBooks} {searchQuery ? "matching items" : "items"})
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

      <Grid container spacing={3}
      sx={{ marginLeft: "11px" }}
      columnSpacing={0.4}>
        {currentBooks.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={3} onClick={() => handleBookClick(book._id)}>
            <div style={{ cursor: "pointer" }}>
              <BookCard book={transformBookData(book)} />
            </div>
          </Grid>
        ))}
      </Grid>

  {currentBooks.length === 0 && (
        <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
          <Typography variant="h6">No books found matching "{searchQuery}"</Typography>
        </Box>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination count={totalFilteredPages} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      )}
    </Container>
  )
}

export default BookList
