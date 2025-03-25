




import { Card, CardContent, CardMedia, Typography, Box, styled, Chip } from "@mui/material"

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "90%",
  display: "flex",
  flexDirection: "column",
  boxShadow: "none",
  backgroundColor: "#f9f9f9",
  borderRadius: "4px",
  border: "2px solid rgba(240, 240, 240, 0.9)",
}))

const RatingBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "#4caf50",
  color: "white",
  borderRadius: "4px",
  padding: "0px 4px",
  fontSize: "14px",
  marginRight: "4px",
}))

const ReviewCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "14px",
}))

const PriceBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}))

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  fontSize: "14px",
}))

function BookCard({ book }) {
  const discountPercentage = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)

  return (
    <StyledCard>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={book.imageUrl}
          alt={book.title}
          sx={{
            height: 170,
            objectFit: "contain",
            p: 2,
            pb: 1,
          }}
        />
        {book.outOfStock && (
          <Chip
            label="OUT OF STOCK"
            color="default"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              fontWeight: "bold",
            }}
          />
        )}
      </Box>
      <CardContent sx={{ p: 1,backgroundColor:"white", pb: 2, "&:last-child": { pb: 2 } }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            fontWeight: 500,
            color: "#333",
            fontSize: "16px",
            // mb: 0.5,
            height: "30px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {book.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "14px",
            mb: 1,
          }}
        >
          by {book.author}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <RatingBadge>{book.rating}★</RatingBadge>
          <ReviewCount variant="body2">({book.reviews})</ReviewCount>
        </Box>

        <PriceBox>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              fontSize: "16px",
            }}
          >
            Rs. {book.price}
          </Typography>
          <OriginalPrice variant="body2">Rs. {book.originalPrice}</OriginalPrice>
          {discountPercentage > 0 && (
            <Typography variant="body2" color="success.main" sx={{ fontSize: "14px", fontWeight: 500 }}>
              {discountPercentage}% off
            </Typography>
          )}
        </PriceBox>
      </CardContent>
    </StyledCard>
  )
}

export default BookCard

