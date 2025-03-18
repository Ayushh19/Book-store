import axios from "axios"

const BASE_URL = "https://bookstore.incubation.bridgelabz.com/bookstore_user"

// 🔹 User Registration
export const registerUser = async (userData) => {
  try {
    console.log("Registering User:", userData)
    
    const response = await axios.post(`${BASE_URL}/registration`, userData, {
      headers: { "Content-Type": "application/json" },
    })

    return response.data
  } catch (error) {
    handleError(error, "Registration failed")
  }
}

// 🔹 User Login
export const loginUser = async (userData) => {
  try {
    console.log("Logging in User:", userData)

    const response = await axios.post(`${BASE_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    })

    return response.data
  } catch (error) {
    handleError(error, "Login failed")
  }
}

// 🔹 User Verification
export const verifyUser = async (token) => {
  try {
    console.log("Verifying User with Token:", token)

    const response = await axios.post(`${BASE_URL}/verification/${token}`)

    return response.data
  } catch (error) {
    handleError(error, "Verification failed")
  }
}

// 🔹 Error Handling Function
const handleError = (error, defaultMessage) => {
  if (error.response) {
    throw new Error(error.response.data.message || defaultMessage)
  } else if (error.request) {
    throw new Error("No response from server")
  } else {
    throw new Error("Error setting up request")
  }
}
