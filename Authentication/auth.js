const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const express = require('express')

const router = express.Router()
router.post('/signup', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      res.json({ status: 'failed', msg: 'Email already exists' })
      return
    }

    const userId = await User.findOne({ username: req.body.username })
    if (userId) {
      res.json({ status: 'failed', msg: 'UserId already exists' })
      return
    }

    const password = await bcrypt.hash(req.body.password, 12)

    const newuser = {
      email: req.body.email,
      username: req.body.username,
      password: password
    }

    const us = await User.create(newuser)
    const token = await jwt.sign(
      { email: us.email, username: us.username },
      'saubhik_sjson_private_key'
    )
    res.json({
      status: 'success',
      msg: 'Welcome ' + req.body.email,
      info: { email: us.email, username: us.username },
      token: token
    })
    console.log(us)
  } catch (err) {
    throw err
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    })

    if (!user) {
      res.json({ status: 'failed', msg: 'User not found' })
      return
    }

    const dcryptpass = await bcrypt.compare(req.body.password, user.password)
    if (!dcryptpass) {
      res.json({ status: 'failed', msg: 'Wrong password' })
      return
    }

    const token = jwt.sign(req.body, 'saubhik_sjson_private_key')
    res.json({
      status: 'success',
      msg: 'Welcome ' + req.body.email,
      token: token
    })
    return
  } catch (err) {
    throw err
  }
})

module.exports = router
