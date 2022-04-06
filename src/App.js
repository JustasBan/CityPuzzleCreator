import { getAllPuzzles, getOnePuzzle, createPuzzle, editPuzzle, deletePuzzle } from './services/CityPuzzleAPIcommuncation';
import { useEffect, useState } from 'react'
import DataTable from './UI/dataTable';
import APIform from './UI/APIform';

function App() {
  let currentUserId = 1;

  const [puzzles, setPuzzles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPuzzles()
      .then(result => {
        setPuzzles(result.data)
        setLoading(false)
      })
      .catch(error => console.log(error))
  }, [])


  if (loading === false) {
    return (

      <div className="Web Client">
        <h3 className='d-flex justify-content-center m-3'>Web client for Clients/Partners</h3>
        <DataTable puzzlesArg={puzzles} currentUserIdArg={currentUserId} setPuzzlesArg={setPuzzles}/>
        <APIform currentUserIdArg={currentUserId}  setPuzzles={setPuzzles} puzzles={puzzles}/>
      </div>
    );
  }

}

export default App;
