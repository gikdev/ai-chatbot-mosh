import dotenv from "dotenv"
import express from "express"

dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Hello world!")
})

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello World! How are you?"
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
