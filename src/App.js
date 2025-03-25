






import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import Home from "./pages/page"
import Header from "./components/header"
import Footer from "./components/footer"
import BookList from "./components/bookList"
import BookDetail from "./components/bookDetails"
import AuthorizedRoute from "./routes/AuthorizedRoute"
import ProtectedRoute from "./routes/ProtectedRoute"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import CartPage from "./components/cartPage"
import WishlistPage from "./components/wishlist"


const theme = createTheme({
  palette: {
    primary: {
      main: "#a52a2a", 
    },
    secondary: {
      main: "#2a7da5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
  },
})

// Layout component that includes Header and Footer
function DashboardLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<BookList />} />
        <Route path="book/:bookId" element={<BookDetail />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Protected Routes: Only accessible if authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            {/* Add other protected routes here */}
          </Route>

          {/* Authorized Routes: Only accessible if not authenticated */}
          <Route element={<AuthorizedRoute />}>
            <Route path="/" element={<Home />} />
            {/* Add other non-authenticated routes here */}
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </Provider>
  )
}

export default App

