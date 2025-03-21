// Map of book titles or keywords to image paths
const bookImageMap = {
  // Exact title matches
  "UX For DUMMIES": "/images/Image8@2x.png",
  "Don't Make Me Think": "/images/Image20@2x.png",
  "Mastering SharePoint Framework": "/images/Image22@2x.png",
  "UX Design": "/images/Image10@2x.png",
  "Lean UX": "/images/Image13@2x.png",
  "The Design of Everyday Things": "/images/Image12@2x.png",
  "React Material-UI": "/images/Image36@2x.png",
  "The Alchemist": "/images/Image7@2x.png",

  // Alternative versions
  "Don't Make Me Think Revisited": "/images/Image11@2x.png",
  "UX for Dummies": "/images/Image23@2x.png",
}

// Fallback images for different categories
const categoryImages = {
  UX: "/images/Image8@2x.png",
  Design: "/images/Image12@2x.png",
  Programming: "/images/Image36@2x.png",
  React: "/images/Image36@2x.png",
  SharePoint: "/images/Image22@2x.png",
  Web: "/images/Image20@2x.png",
  // default: "/images/Image10@2x.png",
}

// Keywords to category mapping
const keywordToCategoryMap = {
  ux: "UX",
  design: "Design",
  react: "React",
  material: "React",
  sharepoint: "SharePoint",
  web: "Web",
  usability: "Web",
  programming: "Programming",
  framework: "Programming",
  cookbook: "Programming",
}

// Function to get image path based on book title or other properties
export const getBookImage = (book) => {
  // Check if we have an exact match for the title
  for (const [key, path] of Object.entries(bookImageMap)) {
    if (book.title && book.title.toLowerCase().includes(key.toLowerCase())) {
      return path
    }
  }

  // Check for keywords in the title to determine category
  const title = book.title ? book.title.toLowerCase() : ""
  for (const [keyword, category] of Object.entries(keywordToCategoryMap)) {
    if (title.includes(keyword)) {
      return categoryImages[category]
    }
  }

  // Check author-based matches
  if (book.author) {
    const author = book.author.toLowerCase()
    if (author.includes("krug")) {
      return bookImageMap["Don't Make Me Think"]
    }
    if (author.includes("norman")) {
      return bookImageMap["The Design of Everyday Things"]
    }
    if (author.includes("coelho")) {
      return bookImageMap["The Alchemist"]
    }
  }

  // Return default image if no match found
  return categoryImages.default
}

// Function to get multiple images for a book (for thumbnails)
export const getBookThumbnails = (book) => {
  const mainImage = getBookImage(book)
  const thumbnails = [mainImage]

  // Add alternative views based on book category
  const title = book.title ? book.title.toLowerCase() : ""

  // Add category-specific alternative views
  if (title.includes("ux")) {
    if (mainImage !== "/images/Image8@2x.png") thumbnails.push("/images/Image8@2x.png")
    if (mainImage !== "/images/Image10@2x.png") thumbnails.push("/images/Image10@2x.png")
  } else if (title.includes("design")) {
    if (mainImage !== "/images/Image12@2x.png") thumbnails.push("/images/Image12@2x.png")
    thumbnails.push("/images/Image7@2x.png")
  } else if (title.includes("react") || title.includes("material")) {
    thumbnails.push("/images/Image36@2x.png")
    thumbnails.push("/images/Image22@2x.png")
  } else if (title.includes("think") || book.author?.toLowerCase().includes("krug")) {
    if (mainImage !== "/images/Image20@2x.png") thumbnails.push("/images/Image20@2x.png")
    if (mainImage !== "/images/Image11@2x.png") thumbnails.push("/images/Image11@2x.png")
  } else {
    // Add some default alternatives if we don't have specific matches
    if (mainImage !== "/images/Image7@2x.png") thumbnails.push("/images/Image7@2x.png")
    if (mainImage !== "/images/Image13@2x.png") thumbnails.push("/images/Image13@2x.png")
  }

  // Ensure we have at least 3 thumbnails
  if (thumbnails.length < 3) {
    const possibleExtras = [
      "/images/Image7@2x.png",
      "/images/Image10@2x.png",
      "/images/Image13@2x.png",
      "/images/Image12@2x.png",
    ]

    for (const extra of possibleExtras) {
      if (!thumbnails.includes(extra)) {
        thumbnails.push(extra)
        if (thumbnails.length >= 3) break
      }
    }
  }

  return thumbnails
}

// Function to get a random book image (for books without specific matches)
export const getRandomBookImage = () => {
  const images = [
    "/images/Image7@2x.png",
    "/images/Image8@2x.png",
    "/images/Image10@2x.png",
    "/images/Image11@2x.png",
    "/images/Image12@2x.png",
    "/images/Image13@2x.png",
    "/images/Image20@2x.png",
    "/images/Image22@2x.png",
    "/images/Image23@2x.png",
    "/images/Image36@2x.png",
  ]

  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

