// import { Card, CardContent, CardMedia, Typography, Box, Rating, Chip, styled } from "@mui/material"

// const StyledCard = styled(Card)(({ theme }) => ({
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   transition: "transform 0.3s ease-in-out",
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: theme.shadows[4],
//   },
// }))

// const PriceBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   gap: theme.spacing(1),
//   marginTop: theme.spacing(1),
// }))

// const OriginalPrice = styled(Typography)(({ theme }) => ({
//   textDecoration: "line-through",
//   color: theme.palette.text.secondary,
// }))

// function BookCard({ book }) {
//   return (
//     <StyledCard>
//       <Box sx={{ position: "relative" }}>
//         <CardMedia
//           component="img"
//           height="200"
//           image={book.imageUrl}
//           alt={book.title}
//           sx={{ objectFit: "contain", p: 2 }}
//         />
//         {book.outOfStock && (
//           <Chip
//             label="OUT OF STOCK"
//             color="default"
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               backgroundColor: "rgba(255, 255, 255, 0.9)",
//               fontWeight: "bold",
//             }}
//           />
//         )}
//       </Box>
//       <CardContent sx={{ flexGrow: 1 }}>
//         <Typography gutterBottom variant="h6" component="div" noWrap>
//           {book.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           by {book.author}
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//           <Rating value={book.rating} precision={0.5} readOnly size="small" />
//           <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
//             ({book.reviews})
//           </Typography>
//         </Box>
//         <PriceBox>
//           <Typography variant="h6" color="text.primary">
//             Rs. {book.price}
//           </Typography>
//           <OriginalPrice variant="body2">Rs. {book.originalPrice}</OriginalPrice>
//         </PriceBox>
//       </CardContent>
//     </StyledCard>
//   )
// }

// export default BookCard

import { Card, CardContent, CardMedia, Typography, Box, styled } from "@mui/material"

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  boxShadow: "none",
  backgroundColor: "#f9f9f9",
  borderRadius: "4px",
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
  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={book.imageUrl}
        alt={book.title}
        sx={{
          height: 200,
          objectFit: "contain",
          p: 2,
          pb: 1,
        }}
      />
      <CardContent sx={{ p: 1, pb: 2, "&:last-child": { pb: 2 } }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            fontWeight: 500,
            color: "#333",
            fontSize: "16px",
            mb: 0.5,
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
        </PriceBox>
      </CardContent>
    </StyledCard>
  )
}

export default BookCard

