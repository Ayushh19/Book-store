"use client"

import { useState } from "react"
import { AppBar, Toolbar, Typography, InputBase, IconButton, Badge, Box, alpha, styled } from "@mui/material"
import {
  Search as SearchIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
} from "@mui/icons-material"
import BookIcon from "@mui/icons-material/MenuBook"

// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}))

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.75rem",
}))

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <AppBar position="static" sx={{ bgcolor: "#a52a2a" }}>
      <Toolbar>
        {/* Mobile menu icon - only visible on small screens */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BookIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            Bookstore
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
          </Search>
        </Box>

        {/* Profile Icon */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton size="large" color="inherit">
            <IconContainer>
              <PersonIcon />
              <Typography variant="caption">Profile</Typography>
            </IconContainer>
          </IconButton>
        </Box>

        {/* Cart Icon */}
        <Box sx={{ display: { xs: "flex", md: "flex" } }}>
          <IconButton size="large" color="inherit">
            <IconContainer>
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon />
              </Badge>
              <Typography variant="caption">Cart</Typography>
            </IconContainer>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;

