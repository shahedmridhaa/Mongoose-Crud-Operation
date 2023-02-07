const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const userSchema = require('../Schemas/userSchema')
const jwt = require('jsonwebtoken')

// ==model==
const User = new mongoose.model('user', userSchema)

//=== Sign Up===
router.post('/signUp', async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      // password:hashedPassword
      status: req.body.status,
    })
    const newData = await newUser.save()
    res.status(201).send(newData)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// ===Login===
router.post('/login', async (req, res) => {
  try{
    const user = await User.find({ username: req.body.username })
    console.log(user);
    if (user && user.length > 0) {
      // const isvalidPassword = await bcrypt.compare(req.body.password, user[0].password)
      const isvalidPassword = await req.body.password
      console.log(isvalidPassword);
      if (isvalidPassword) {
        //generate token
        const token = jwt.sign(
           {
             username: user[0].username,
             userId: user[0]._id,
           },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          },
        )
        res.status(200).send(token)
      } else {
        res.status(401).send({ message: 'Authentication Faild' })
      }
    } else {
      res.status(401).send({ message: 'Authentication Faild' })
    }
  }catch(error){
    res.status(400).send({ message: 'Authentication Faild' })
    
  }
})

module.exports = router
