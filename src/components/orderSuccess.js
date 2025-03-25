"use client"

import { Box, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function OrderSuccess() {
  const navigate = useNavigate()
  const orderId = `#${Math.floor(100000 + Math.random() * 900000)}` // Generate random 6-digit order ID

  const handleContinueShopping = () => {
    navigate("/")
  }

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        {/* Celebration Graphics */}
        <Box sx={{ mb: 2 }}>
          <Box
            component="img"
            src="https://adopt.spca.bc.ca/wp-content/themes/adopt-theme/img/adopted_modal_celebrate.svg"
            alt="Celebration"
            sx={{
              height: 120,
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Success Message */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#333", fontWeight: 500 }}>
          Order Placed Successfully
        </Typography>

        <Box sx={{ my: 3 }}>
          <Box
            component="img"
            src="https://img.freepik.com/premium-vector/new-year-fire-works_774538-63.jpg?w=360"
            alt="Confetti"
            sx={{
              height: 40,
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        <Typography variant="h6" sx={{ color: "#666", mb: 1 }}>
          hurray!!! your order is confirmed
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mb: 4 }}>
          the order id is {orderId} save the order id for
          <br />
          further communication..
        </Typography>

        {/* Contact Information */}
        <Grid container sx={{ border: "1px solid #e0e0e0", mb: 4 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              p: 2,
              borderRight: { md: "1px solid #e0e0e0" },
              borderBottom: { xs: "1px solid #e0e0e0", md: "none" },
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1, color: "#666" }}>
              Email us
            </Typography>
            <Divider></Divider>
            <Typography variant="body2" sx={{ mt: 2 }}>admin@bookstore.com</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              p: 2,
              borderRight: { md: "1px solid #e0e0e0" },
              borderBottom: { xs: "1px solid #e0e0e0", md: "none" },
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1, color: "#666" }}>
              Contact us
            </Typography>
            <Divider></Divider>
            <Typography variant="body2" sx={{ mt: 2 }}>+91 8163475881</Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: "#666" }}>
              Address
            </Typography>
            <Divider></Divider>
            <Typography variant="body2" sx={{ mt: 2 }}>
              42, 14th Main, 15th Cross, Sector 4, opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore
              560034
            </Typography>
          </Grid>
        </Grid>

        {/* Continue Shopping Button */}
        <Button
          variant="contained"
          onClick={handleContinueShopping}
          sx={{
            bgcolor: "#4285f4",
            "&:hover": { bgcolor: "#3367d6" },
            px: 4,
            py: 1.5,
            borderRadius: "4px",
            textTransform: "uppercase",
          }}
        >
          CONTINUE SHOPPING
        </Button>
      </Paper>
    </Container>
  )
}

export default OrderSuccess

