const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://dyalex:WrtQYPqYpCPvGU2q@cluster0.9dlzwlq.mongodb.net/phonebook?appName=Cluster0`

if (password !== 'WrtQYPqYpCPvGU2q'){
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

if (process.argv.length == 3 && password === 'WrtQYPqYpCPvGU2q') {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })  
}

person.save().then(result => {
  console.log(`added ${person.name} number ${person.number} to phonebook.`)
  mongoose.connection.close()
})

