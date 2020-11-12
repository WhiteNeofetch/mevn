const app = require('./app.js')


const host = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 1337
app.listen(PORT, () => {
  console.log(`Server is work on ${PORT}`)
})
