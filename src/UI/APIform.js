import { createPuzzle, uploadFile } from '../services/CityPuzzleAPIcommuncation';
import { useState } from 'react'

const APIform = ({ currentUserIdArg, setPuzzles, puzzles }) => {

    const [newInput, setNewInput] = useState(
        {
            name: '',
            about: '',
            quest: '',
            latitude: '',
            longitude: '',
            imgAdress: ''
        }
    )
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
        let newerInput = newInput
        setNewInput({ ...newerInput, imgAdress: event.target.files[0].name })
      }
    
    const handleInputChange = (event) => {
        let newerInput
        switch (event.target.id) {

            case 'name':
                newerInput = newInput
                setNewInput({ ...newerInput, name: event.target.value })
                break

            case 'about':
                newerInput = newInput
                setNewInput({ ...newerInput, about: event.target.value })
                break

            case 'quest':
                newerInput = newInput
                setNewInput({ ...newerInput, quest: event.target.value })
                break

            case 'latitude':
                newerInput = newInput
                setNewInput({ ...newerInput, latitude: event.target.value })
                break
            case 'longitude':
                newerInput = newInput
                setNewInput({ ...newerInput, longitude: event.target.value })
                break

            default:
                break
        }
    }

    const addPuzzle = (event) => {
        event.preventDefault()

        let tempPostObj = {
            ...newInput,
            userId: currentUserIdArg,
            id: 0
        }

        uploadFile(selectedFile);

        createPuzzle(tempPostObj)
            .then(initialResponse => {
                console.log("Success")
                tempPostObj.id = puzzles[puzzles.length-1].id+1
                setPuzzles(puzzles.concat(tempPostObj))
            })
            .catch((error) => console.log(tempPostObj))
    }

    return (
        <div className='container'>
            <form onSubmit={addPuzzle}>
                <div className="form-group">
                    <label >name:</label>
                    <input className="form-control" id="name" placeholder="Enter name" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label >about:</label>
                    <input className="form-control" id="about" placeholder="Enter about" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label >quest:</label>
                    <input className="form-control" id="quest" placeholder="Enter quest" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label >latitude:</label>
                    <input className="form-control" id="latitude" placeholder="Enter latitude" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label >longitude:</label>
                    <input className="form-control" id="longitude" placeholder="Enter longitude" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label >img:</label>
                    <input type="file" onChange={handleFileSelect}/>
                </div>
                <button type="submit" className="btn btn-dark mr-3 justify-content-center">Submit</button>
            </form>
        </div>
    )
}

export default APIform;