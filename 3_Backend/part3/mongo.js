const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('give password as argument')
  process.exit(1)
}

const url = 'mongodb+srv://fullstack:(passgoeshere)@database.orepcc0.mongodb.net/noteApp?appName=database'

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})