



// import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
// import {  Routes, Route, Outlet } from "react-router-dom"
// import Footer from "../components/footer"
// import BookList from "../components/bookList"
// import BookDetail from "../components/bookDetails"
// import Header from "../components/header"


// // Create a custom theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#a52a2a", // Maroon color from the header
//     },
//     secondary: {
//       main: "#2a7da5",
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//   },
//   components: {
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//         },
//       },
//     },
//   },
// })

// // Layout component that includes Header and Footer
// function Layout() {
//   return (
//     <>
//       <Header />
//       <Outlet />
//       <Footer />
//     </>
//   )
// }

// function Dashboard() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
      
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<BookList />} />
//             <Route path="book/:bookId" element={<BookDetail />} />
//           </Route>
//         </Routes>
      
//     </ThemeProvider>
//   )
// }

// export default Dashboard



import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import Header from "./components/header"
import BookList from "./components/bookList"
import BookDetail from "./componennts/bookDetails"
import Footer from "./components/footer"

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

// Layout component that includes Header and Footer
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default Dashboard

