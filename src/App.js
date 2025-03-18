// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import Home from "./pages/page"; 
// // import Dashboard from "./pages/dashboard";

// // function App() {
// //   const isAuthenticated = () => {
// //     return localStorage.getItem("accessToken") !== null;
// //   };

// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Protected Route: Only accessible if authenticated */}
// //         <Route
// //           path="/dashboard"
// //           element={
// //             isAuthenticated() ? <Dashboard /> : <Navigate to="/" replace />
// //           }
// //         />
        
// //         {/* Authorized Route: Only accessible if not authenticated */}
// //         <Route
// //           path="/"
// //           element={
// //             isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Home />
// //           }
// //         />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// // // import React from "react";
// // // import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
// // // import Home from "./pages/page"; // Import Home component
// // // import Dashboard from "./pages/dashboard";
// // // import AuthorizedRoute from "./routes/AuthorizedRoute"; // Import AuthorizedRoute
// // // import ProtectedRoute from "./routes/ProtectedRoute"; // Import ProtectedRoute

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         {/* Protected Route: Only accessible if authenticated */}
// // //         <Route
// // //           path="/dashboard"
// // //           element={
// // //             <ProtectedRoute>
// // //               <Dashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />
        
// // //         {/* Authorized Route: Only accessible if not authenticated */}
// // //         <Route
// // //           path="/"
// // //           element={
// // //             <AuthorizedRoute>
// // //               <Home />
// // //             </AuthorizedRoute>
// // //           }
// // //         />

// // //         {/* Fallback Route */}
// // //         <Route path="*" element={<Navigate to="/" replace />} />
// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/page";// Import Home component
// import Dashboard from "./pages/dashboard";
// import AuthorizedRoute from "./routes/AuthorizedRoute"; // Import AuthorizedRoute
// import ProtectedRoute from "./routes/ProtectedRoute"; // Import ProtectedRoute

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Protected Route: Only accessible if authenticated */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
        
//         {/* Authorized Route: Only accessible if not authenticated */}
//         <Route
//           path="/"
//           element={
//             <AuthorizedRoute>
//               <Home />
//             </AuthorizedRoute>
//           }
//         />

//         {/* Fallback Route */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/page"
import Dashboard from "./pages/dashboard"
import AuthorizedRoute from "./routes/AuthorizedRoute"
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes: Only accessible if authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
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
  )
}

export default App

