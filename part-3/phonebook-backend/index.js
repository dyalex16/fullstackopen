require('dotenv').config() 
const express = require('express')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())


// let persons = [
//     {
//         id: "1",
//         name: "Arto Hellas",
//         number: "040-123456"
//     },
//     {
//         id: "2",
//         name: "Ada Lovelace",
//         number: "39-44-532323"
//     },
//     {
//         id: "3",
//         name: "Dan Abramov",
//         number: "12-43-234533"
//     },
//     {
//         id: "4",
//         name: "Mary Poppendieck",
//         number: "39-23-12325445"
//     }
// ]

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})


app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(foundPerson => {
        res.json(foundPerson)
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
         error: 'name or number missing' 
        })
    }
  
    const person = new Person({
        id: body.id || generateID(),
        name: body.name,
        number: body.number,
    })
    
    person.save().then(savedNumber => {
        res.json(savedNumber)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)

    if (!person){
        return res.status(404).json({
            error: `info does not exist on server`
        })
    }
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

function generateID() {
    return Math.floor(Math.random() * (21 - 5) + 5)
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

