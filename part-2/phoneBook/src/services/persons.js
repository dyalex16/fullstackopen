import axios from "axios"
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = async (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = async id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
} 

const personService = { getAll, add, update, remove }

export default personService