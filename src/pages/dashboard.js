import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import Header from "./components/header"
import BookList from "./components/BookList"
import BookDetail from "./components/BookDetail"
import CartPage from "./components/CartPage"
import Footer from "./components/footer"
import { Box } from "@mui/material"
import { Dashboard } from "@mui/icons-material"

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#a52a2a", // Maroon color from the header
    },
    secondary: {
      main: "#2a7da5",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#4285f4",
          "&:hover": {
            backgroundColor: "#3367d6",
          },
        },
      },
    },
  },
})

// Layout component that includes Header and Footer
function Layout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Header />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

function Dashboard() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<BookList />} />
              <Route path="book/:bookId" element={<BookDetail />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default Dashboard

