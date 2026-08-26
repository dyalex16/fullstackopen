const Persons = ({ persons, onDelete }) => {
    return (
        <div>
            {persons.length == 0? <h3>No numbers found</h3>: 
             persons.map((person) => 
             <div key={person.id}>
                {person.name} {person.number} {''}
                <button onClick={() => onDelete(person.id)}>delete</button>
             </div>)}
        </div>
    )
    
}

export default Persons