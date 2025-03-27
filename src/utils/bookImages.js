

// Array of available book cover images - we'll use 6 distinct images for our cycle
const bookImages = [
  "/images/Image8@2x.png", // UX for Dummies
  "/images/Image36@2x.png", // React Material-UI
  "/images/Image10@2x.png", // UX Design
  "/images/Image20@2x.png", // Don't Make Me Think
  "/images/Image12@2x.png", // Design of Everyday Things
  "/images/Image22@2x.png", // Mastering SharePoint
]

// Additional images for thumbnails and variety
const additionalImages = [
  "/images/Image7@2x.png",
  "/images/Image11@2x.png",
  "/images/Image13@2x.png",
  "/images/Image23@2x.png",
]

// All images combined for thumbnails
const allImages = [...bookImages, ...additionalImages]

/**
 * Get a consistent book image based on book ID
 * This function will always return the same image for the same book ID
 * But it cycles through 6 different images to ensure variety on the page
 */
export const getConsistentBookImage = (bookId) => {
  if (!bookId) return bookImages[0] // Default to first image if no ID

  // Create a numeric hash from the book ID
  let hash = 0
  for (let i = 0; i < bookId.length; i++) {
    hash = (hash << 5) - hash + bookId.charCodeAt(i)
    hash = hash & hash // Convert to 32bit integer
  }

  // Make hash positive
  hash = Math.abs(hash)

  // Use modulo 6 to get an index between 0-5
  // This ensures we cycle through our 6 main images
  const index = hash % 6

  return bookImages[index]
}

/**
 * Get book image - this is a wrapper around getConsistentBookImage
 */
export const getBookImage = (book) => {
  // If we have a book ID, use the consistent image function
  if (book.id || book._id) {
    return getConsistentBookImage(book.id || book._id)
  }

  // Return first image as default
  return bookImages[0]
}

/**
 * Get thumbnails for a book (for detail page)
 * Returns an array of 3 images, with the main image as the first one
 */
export const getBookThumbnails = (book) => {
  // Get the main image using our consistent function
  const mainImage = getBookImage(book)

  // Create a set of thumbnails starting with the main image
  const thumbnails = [mainImage]

  // Get the book ID
  const bookId = book.id || book._id || ""

  // Create a numeric hash from the book ID
  let hash = 0
  for (let i = 0; i < bookId.length; i++) {
    hash = (hash << 5) - hash + bookId.charCodeAt(i)
    hash = hash & hash // Convert to 32bit integer
  }

  // Make hash positive
  hash = Math.abs(hash)

  // Select two more images that are different from the main image
  // and different from each other
  const secondIndex = (hash + 3) % allImages.length
  let secondImage = allImages[secondIndex]

  // Make sure second image is different from main image
  if (secondImage === mainImage) {
    secondImage = allImages[(secondIndex + 1) % allImages.length]
  }

  const thirdIndex = (hash + 7) % allImages.length
  let thirdImage = allImages[thirdIndex]

  // Make sure third image is different from main and second images
  if (thirdImage === mainImage || thirdImage === secondImage) {
    thirdImage = allImages[(thirdIndex + 1) % allImages.length]
    if (thirdImage === mainImage || thirdImage === secondImage) {
      thirdImage = allImages[(thirdIndex + 2) % allImages.length]
    }
  }

  thumbnails.push(secondImage, thirdImage)

  return thumbnails
}

// This function is kept for backward compatibility but now uses the consistent approach
export const getRandomBookImage = (bookId) => {
  if (bookId) {
    return getConsistentBookImage(bookId)
  }

  // If no ID is provided, return the first image as default
  return bookImages[0]
}

