const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8001

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routers
app.use('/api/users', require('./routers/userRoutes'))
app.use('/api/tickets', require('./routers/ticketRoutes'))

// Server frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__firname, '../frontend/build')))

  app.get('*', (_, res) =>
    res.sendFile(__dirname, '../frontend/build/index.html')
  )
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' })
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
