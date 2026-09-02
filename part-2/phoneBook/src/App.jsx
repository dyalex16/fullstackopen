import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('success')

  useEffect(() => {
    personService.getAll()
    .then(initialNumbers => {
      setPersons(initialNumbers)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterText(event.target.value)
  }

  const displayNotification = (text, type) => {
    setErrorMessage(text)
    setErrorType(type)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)  
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: phoneNumber } 
    
    const found = persons.find(person => person.name === newName)
    if (found === undefined){
      personService.add(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setPhoneNumber('')
        displayNotification(`${newName} added successfully!`, 'success')
      })
    } else if ((found.number !== phoneNumber)){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const changedPerson = {...found, number: phoneNumber}
          personService.update(found.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id == found.id? 
                returnedPerson : person ))
            setNewName('')
            setPhoneNumber('')
            displayNotification(`${newName}'s number updated successfully!`, 'success')  
          }).catch(error => {
            console.log(error)
            setPersons(persons.filter(person => person.id != found.id))
            displayNotification(`${newName} info does not exist on the server`, 'error')
          })
        }
    } 
    else{
      setPersons([...persons])
      displayNotification(`${newName} already added to phonebook`, 'error')
    }
  }

  const removePerson = (id) => {
    const target = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${target.name}?`)){
      personService.remove(id)
      .then(deleted => {
        setPersons(persons.filter(person => person.id !== id))
        displayNotification(`${target.name} deleted successfully!`, 'success')  
      })
      .catch(error => {
        console.log(error)
        setPersons(persons.filter(person => person.id !== id))
        displayNotification(`${target.name} info doesn't exist on the server`, 'error')  
      })
    } else{
      setPersons([...persons])
    }
  }

  const numbersToShow = filterText.length == 0
  ? persons
  : persons.filter(person => 
    person.name.toLowerCase().includes(filterText.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={errorType} />
      <Filter 
       type="search"
       value={filterText}
       onChange={handleFilter}
      />
      <h2>Add a new</h2>
      <PersonForm 
       nameValue={newName}
       nameChange={handleNameChange}
       phoneValue={phoneNumber}
       phoneChange={handleNumberChange}
       onSubmit={addPerson}
      />
      
      <h2>Numbers</h2>
        <Persons
         persons={numbersToShow}
         onDelete={removePerson}
        />
    </div>
  )

}

export default App