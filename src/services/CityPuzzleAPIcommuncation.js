import axios from "axios";

const puzzlesUrl = 'http://localhost:26790/api/Puzzles/'
const completedPuzzlesUrl = 'http://localhost:26790/api/CompletedPuzzles/'

//service to get/post/put/delete puzzles

function getAllPuzzles() {
    const request = axios.get(puzzlesUrl)
    const response = request;
    return response;
}

function getCompletedPuzzleCount(id) {
    const request = axios.get(completedPuzzlesUrl + id)
    const response = request
    return response;
}

function createPuzzle(newObject) {
    const request = axios.post(puzzlesUrl, newObject)
    const response = request;
    return response;
}

function deletePuzzle(id) {
    return axios.delete(puzzlesUrl + id)
}

function uploadFile(file) {
    const formData = new FormData();
    formData.append("selectedFile", file);
    try {
        const response = axios({
            method: "post",
            url: "http://localhost:26790/api/Puzzles/savefile/",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

export { getAllPuzzles, getCompletedPuzzleCount, createPuzzle, deletePuzzle, uploadFile }