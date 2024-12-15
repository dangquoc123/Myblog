const express = require('express')
const path = require('path')
const app = express();
const useRouter = require('./routes/user')
const PORT = 8001
const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost:27017/myblog')
    .then(() => console.log('Database connect successfully !'))
    .catch(() => console.log('error from connection database !'))

app.set('view engine','ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({extended : false}))
app.use(express.json());

app.get('/', (req, res) => {
    return res.render('home')
})

app.use('/user', useRouter)

app.listen(PORT, () => console.log(`Server started at port : ${PORT}`))