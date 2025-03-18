"use client"
import AuthCard from "./auth-card"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import "./styles.css"

const theme = createTheme({
  palette: {
    primary: {
      main: "#b33a3a",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <main className="main-container">
        <AuthCard />
      </main>
    </ThemeProvider>
  )
}

