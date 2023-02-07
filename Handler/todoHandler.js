const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const todoSchema = require('../Schemas/todoSchemas')
const userSchema = require('../Schemas/userSchema')
const checkLogin = require('../middleware/checkLogin')
const User = new mongoose.model('User', userSchema)

// ==model==
const Todo = new mongoose.model('Todo', todoSchema)

// Get all Todos
router.get('/', checkLogin, async (req, res) => {
  console.log(req.username, req.userId)
  try {
    const todoData = await Todo.find()
    if (todoData) {
      res.status(200).send(todoData)
    } else {
      res.status(404).send({ message: 'Todo data not found' })
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// get active Todos
router.get('/active', async (req, res) => {
  const todo = new Todo()
  const data = await todo.findActive()
  res.status(200).send(data)
})

// Get a Todos
router.get('/:id', async (req, res) => {})




// Post Todos
router.post('/', checkLogin, async (req, res) => {
  console.log(req.username, req.userId)
  const newTodos = new Todo({
    ...req.body,
    user: req.userId
  })
  try {
    
    const todoData = await newTodos.save()
    await User.updateOne({
      _id: req.userId
    },{
      $push :{
        todos: todoData._id
      }
    })

    res.status(200).send(todoData)
  } catch (error) {
    res.status(500).send({ message: error.message })
    console.log(error)
  }
})





// Post Multiple Todos
router.post('/all', async (req, res) => {})

// Put Todos
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const todoData = await Todo.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: 'inactive',
        },
      },
    )
    res.status(200).send(todoData)
    console.log(todoData)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// delete Todos
router.delete('/:id', async (req, res) => {})

module.exports = router
