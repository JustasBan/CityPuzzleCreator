import { getCompletedPuzzleCount, deletePuzzle } from '../services/CityPuzzleAPIcommuncation'
import { useEffect, useState } from 'react'

function deleteHandle (id, puzzles, setPuzzles){
        deletePuzzle(id).then(response => {
            console.log("delete succsess");
            setPuzzles(puzzles.filter(x => x.id != id))
        })
        .catch(response => console.log(response))
    }

const Row = ({ puzzle, puzzles, setPuzzles }) => {

    const [visitors, setVisitors] = useState(0)

    useEffect(() => {
        getCompletedPuzzleCount(puzzle.id)
            .then(result => {
                setVisitors(result.data)
            })
            .catch(error => console.log(error))
    }, [visitors])
 
    return (
        <tr>
            <td>{puzzle.name}</td>
            <td>{puzzle.about}</td>
            <td>{puzzle.quest}</td>
            <td>{puzzle.latitude}</td>
            <td>{puzzle.longitude}</td>
            <td><img src={'http://localhost:26790/api/Puzzles/getfile?name='+puzzle.imgAdress}></img></td>
            <td>{visitors}</td>
            <button type="button" className="btn btn-light mr-1" onClick={() => deleteHandle(puzzle.id, puzzles, setPuzzles)}>delete</button>
        </tr>
    )
}

const DataTable = ({ puzzlesArg, currentUserIdArg, setPuzzlesArg }) => {
    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>About</th>
                        <th>Quest</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Photo</th>
                        <th>Visitors</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {puzzlesArg.filter(x => x.userId === currentUserIdArg).map(x => <Row puzzle={x} key={x.id} puzzles={puzzlesArg} setPuzzles={setPuzzlesArg}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable;