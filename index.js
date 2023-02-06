const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const todoHandler = require('./Handler/todoHandler')



// express app initialization
const app = express()
app.use(express.json())



// // database connection with mongoose
const connectionDb = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/todos')
    console.log('Database Connected')
  } catch (error) {
    console.log('database not Connected')
    console.log(error.message)
  }
}


// application routes
app.use('/todo', todoHandler)

app.listen(3000, async () => {
  console.log('Crud Operation Server is running')
  await connectionDb()
})
