const Header = ({ name }) => {
  return <h4>{ name }</h4>
}

const Part = ({ topic, exercise }) => {
  return <p>{topic} {exercise}</p>
}

const Content = ({ parts }) => {
  parts.map(part => <Part topic={part.name} exercise={part.exercises} />)
}

const Course = ({ title, course }) => {
  return (
    <div>
      <Header name={title} />
      <Content parts={course}/>
    </div>
  )
}

export default Course