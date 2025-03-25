"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  Container,
} from "@mui/material";
import {
  Search as SearchIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import BookIcon from "@mui/icons-material/MenuBook";
import CartDrawer from "./cartDrawer";

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
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

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
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.75rem",
}));

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const navigate = useNavigate();

  // Get cart count from Redux store
  const cartCount = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // ✅ Remove access token
    navigate("/login"); // ✅ Redirect to login
  };

  const handleWishlistClick = () => {
    // Navigate to the wishlist page
    navigate("/dashboard/wishlist")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#a52a2a" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
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
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <BookIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Bookstore
              </Typography>
            </Link>

            {/* Search Bar */}
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
             
              <Search sx={{ backgroundColor: "white" }}>
                <SearchIconWrapper sx={{ color: "#6b6b6b" , opacity: 0.7 }}>
                  {" "}
                  {/* Darker Grey for Icon */}
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                  sx={{
                    color: "#6b6b6b", // Dark Grey for text
                    "&::placeholder": { color: "#6b6b6b", opacity: 1 }, // Ensure placeholder matches
                  }}
                />
              </Search>
            </Box>

            {/* Profile Icon */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <IconContainer>
                  <PersonIcon />
                  <Typography variant="caption">Profile</Typography>
                </IconContainer>
              </IconButton>
            </Box>

            {/* Cart Icon */}
            <Box sx={{ display: { xs: "flex", md: "flex" } }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  // Navigate to the correct path with dashboard prefix
                  navigate("/dashboard/cart");
                }}
                aria-label="go to cart"
              >
                <IconContainer>
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                  <Typography variant="caption">Cart</Typography>
                </IconContainer>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

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
        <MenuItem onClick={handleWishlistClick}>Wishlist</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Mobile Menu Drawer */}
      <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <Box sx={{ width: 250 }} role="presentation">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
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
            <ListItem
              button
              onClick={() => {
                navigate("/dashboard/cart");
                toggleMobileMenu();
              }}
            >
              <ListItemText primary="Cart" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Cart Drawer */}
      <CartDrawer open={false} onClose={() => {}} />
    </>
  );
}

export default Header;
