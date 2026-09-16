const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = 'mongodb+srv://dyalex:fmJMoJKxDw2WJVU2@cluster0.9dlzwlq.mongodb.net/phonebook?appName=Cluster0'

if (password !== 'fmJMoJKxDw2WJVU2'){
  console.log('incorrect password')
  process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 3 && password === 'fmJMoJKxDw2WJVU2') {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

person.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook.`)
  mongoose.connection.close()
})

