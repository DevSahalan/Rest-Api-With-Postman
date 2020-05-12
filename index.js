const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

const userRoute = require('./routes/userRoute')
mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true,
useUnifiedTopology: true  })
.then( ()=>{
    console.log('mongodb is connected successfully')
})

const logger = require('./middleware/logger')

// const memberRoute = require('./routes/members-route')

//members route
app.use('/api/members', require('./routes/members-route'))
// app.use('/api/members', memberRoute)

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//set static folder
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) =>{
    res.send('hello world')
})

app.use('/users', userRoute)



app.listen(3000, ()=> console.log('server is started at post 3000'))


