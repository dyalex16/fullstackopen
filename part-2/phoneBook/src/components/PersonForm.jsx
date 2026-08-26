const InputName = ({ value1, change1}) => {
    return (
        <div>
            name: <input value={value1} onChange={change1} />
        </div>
    )
}
const InputPhone = ({ value2, change2 }) => {
    return (
        <div>
            number: <input value={value2} onChange={change2} />
        </div>
    )
}
const Button = () => {

    return (
        <div>
            <button type="submit">add</button>
        </div>
    )
}
const PersonForm = ({nameValue, phoneValue, nameChange, phoneChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <InputName value1={nameValue} change1={nameChange} />
            <InputPhone value2={phoneValue} change2={phoneChange} />
            <Button />
        </form>
    )
}

export default PersonForm