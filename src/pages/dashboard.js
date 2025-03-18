import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import Header from "../components/header"
import BookList from "../components/bookList"
import Footer from "../components/footer"

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#a52a2a", // Maroon color from the header
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

function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <BookList />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Dashboard

