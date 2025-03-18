"use client"

import { useState } from "react"
import { Container, Typography, Grid, Box, FormControl, Select, MenuItem, InputLabel, Pagination } from "@mui/material"
import BookCard from "./bookCard"

// Sample data
const sampleBooks = [
  {
    id: 1,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "https://m.media-amazon.com/images/I/51WS36aA2BL._SY445_SX342_.jpg",
    outOfStock: false,
  },
  {
    id: 2,
    title: "React Material-UI",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "/images/Image22@2x.png",
    outOfStock: false,
  },
  {
    id: 3,
    title: "Mastering SharePoint Framework",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "/images/Image23@2x.png",
    outOfStock: false,
  },
  {
    id: 4,
    title: "UX For DUMMIES",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "https://m.media-amazon.com/images/I/51oXKWrcYYL._SY445_SX342_.jpg",
    outOfStock: true,
  },
  {
    id: 5,
    title: "UX Design",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "/images/Image12@2x.png",
    outOfStock: false,
  },
  {
    id: 6,
    title: "Group Discussion",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "https://m.media-amazon.com/images/I/51Kwaw5nInL._SY445_SX342_.jpg",
    outOfStock: false,
  },
  {
    id: 7,
    title: "Lean UX",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "/images/Image13@2x.png",
    outOfStock: false,
  },
  {
    id: 8,
    title: "The Design of Everyday Things",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "/images/Image7@2x.png",
    outOfStock: false,
  },
  {
    id: 9,
    title: "The Design of Everyday Things",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "/images/Image8@2x.png",
    outOfStock: false,
  },
  {
    id: 10,
    title: "The Design of Everyday Things",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "/images/Image10@2x.png",
    outOfStock: false,
  },
  {
    id: 11,
    title: "The Design of Everyday Things",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "/images/Image36@2x.png",
    outOfStock: false,
  },
  {
    id: 12,
    title: "The Design of Everyday Things",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    imageUrl: "/images/Image11@2x.png",
    outOfStock: false,
  },
]

function BookList() {
  const [sortBy, setSortBy] = useState("relevance")
  const [page, setPage] = useState(1)
  const booksPerPage = 8
  const totalBooks = 128 // From the image "(128 items)"
  const totalPages = Math.ceil(totalBooks / booksPerPage)

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
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
            <MenuItem value="relevance">relevance</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {sampleBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={3}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </Container>
  )
}

export default BookList

