const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
mongoose.set('strictQuery', false)
const todoHandler = require('./Handler/todoHandler')
const userHandler = require('./Handler/userHandler.js')



// express app initialization
const app = express()
dotenv.config()
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
app.use('/user', userHandler)



// ====error hendaler====
const errorHandler = (err, req, res, next) => {
  if(res.headerSent){
    return next(err)
  }
  res.status(500).json({error: err})
}
app.use(errorHandler)

app.listen(3000, async () => {
  console.log('Crud Operation Server is running')
  await connectionDb()
})
