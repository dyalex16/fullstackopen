import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(new Array(8).fill(0,0,8))
  const [voted, setVoted] = useState(false)
  const copy = [...votes]
   
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );

  const showNext = () => {
    let randomQuote = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomQuote);
  }

  const handleVote = () => {
    [...copy, copy[selected]+= 1]
    setVotes(copy)
    setVoted(true)
    console.log(copy);
  }

  const getHighestVote = () => {
    let index = 0;
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > votes[index])
        index = i
    }
    return index
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} has {votes[selected]} vote(s)
      <br />
      <button onClick={handleVote}>vote</button>
      <span> </span>
      <button onClick={showNext}>next anecdote</button>
      <hr />
      <h2>Anecdote with most votes</h2>
      {voted &&
        `${anecdotes[getHighestVote()]} has ${votes[getHighestVote()]} votes.`
      }
    </div>
  )
}

export default App