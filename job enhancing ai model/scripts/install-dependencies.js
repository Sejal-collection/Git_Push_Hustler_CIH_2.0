// This script would install the necessary packages for text extraction
// Run: npm install pdf-parse mammoth

const { execSync } = require("child_process")

try {
  console.log("Installing text extraction dependencies...")

  // Install PDF parsing library
  execSync("npm install pdf-parse", { stdio: "inherit" })

  // Install DOCX parsing library
  execSync("npm install mammoth", { stdio: "inherit" })

  console.log("Dependencies installed successfully!")
  console.log("You can now process PDF and DOCX files properly.")
} catch (error) {
  console.error("Error installing dependencies:", error.message)
}
