const connecToMongo=require('./db')
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')
connecToMongo() //connecting to the database
app.use(express.json()) //it is middleware to access the req.body it parse the incoming request into json
// Avialable routes
app.use(cors())

 //here we are linking /api/auth with other files in routes
 app.use('/api/auth',require('./routes/auth')) //in this if anyone hits /api/auth then it will get reacied to ./routes/auth
 app.use('/api/note',require('./routes/notes'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
