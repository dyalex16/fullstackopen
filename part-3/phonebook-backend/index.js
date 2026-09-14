require('dotenv').config() 
const express = require('express')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

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

app.put('/api/persons/:id', (req, res, next) => {
    const { number } = req.body

    Person.findById(req.params.id)
    .then(person => {
        if (!person) {
            return res.status(404).end()
        }

        person.number = number

        return person.save().then(updatedPerson => {
            res.json(updatedPerson)
        })
    }).catch(error => next(error))  
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
    .then(result => {
            res.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id'})
    }

    next(error)
}

function generateID() {
    return Math.floor(Math.random() * (21 - 5) + 5)
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

