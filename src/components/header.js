// "use client"

// import { useState } from "react"
// import { AppBar, Toolbar, Typography, InputBase, IconButton, Badge, Box, alpha, styled } from "@mui/material"
// import {
//   Search as SearchIcon,
//   Person as PersonIcon,
//   ShoppingCart as ShoppingCartIcon,
//   Menu as MenuIcon,
// } from "@mui/icons-material"
// import BookIcon from "@mui/icons-material/MenuBook"

// // Styled components
// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }))

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }))

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "40ch",
//     },
//   },
// }))

// const IconContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   fontSize: "0.75rem",
// }))

// function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   return (
//     <AppBar position="static" sx={{ bgcolor: "#a52a2a" }}>
//       <Toolbar>
//         {/* Mobile menu icon - only visible on small screens */}
//         <IconButton
//           size="large"
//           edge="start"
//           color="inherit"
//           aria-label="open drawer"
//           sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           <MenuIcon />
//         </IconButton>

//         {/* Logo */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <BookIcon sx={{ mr: 1 }} />
//           <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
//             Bookstore
//           </Typography>
//         </Box>

//         {/* Search Bar */}
//         <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
//           </Search>
//         </Box>

//         {/* Profile Icon */}
//         <Box sx={{ display: { xs: "none", md: "flex" } }}>
//           <IconButton size="large" color="inherit">
//             <IconContainer>
//               <PersonIcon />
//               <Typography variant="caption">Profile</Typography>
//             </IconContainer>
//           </IconButton>
//         </Box>

//         {/* Cart Icon */}
//         <Box sx={{ display: { xs: "flex", md: "flex" } }}>
//           <IconButton size="large" color="inherit">
//             <IconContainer>
//               <Badge badgeContent={0} color="error">
//                 <ShoppingCartIcon />
//               </Badge>
//               <Typography variant="caption">Cart</Typography>
//             </IconContainer>
//           </IconButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default Header;


"use client"

import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Box,
  alpha,
  styled,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material"
import {
  Search as SearchIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null)

  // Get cart count from Redux store
  const cartCount = useSelector((state) => state.cart.totalItems)

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

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
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
          <BookIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            Bookstore
          </Typography>
        </Link>

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
          <IconButton size="large" color="inherit" onClick={handleProfileMenuOpen}>
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
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
              <Typography variant="caption">Cart</Typography>
            </IconContainer>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfileMenuClose}>My Account</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Orders</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Wishlist</MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
      </Menu>

      {/* Mobile Menu Drawer */}
      <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <Box sx={{ width: 250 }} role="presentation">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            <ListItem button component={Link} to="/" onClick={toggleMobileMenu}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={toggleMobileMenu}>
              <ListItemText primary="Categories" />
            </ListItem>
            <ListItem button onClick={toggleMobileMenu}>
              <ListItemText primary="My Account" />
            </ListItem>
            <ListItem button onClick={toggleMobileMenu}>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button onClick={toggleMobileMenu}>
              <ListItemText primary="Wishlist" />
            </ListItem>
            <ListItem button onClick={toggleMobileMenu}>
              <ListItemText primary="Cart" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Header

