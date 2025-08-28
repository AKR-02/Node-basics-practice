//   You need to create an express HTTP server in Node.js which will handle the logic of a file server.
//   - Use built in Node.js `fs` module

//   The expected API endpoints are defined below,
//   1. GET /files - Returns a list of files present in `./files/` directory
//     Response: 200 OK with an array of file names in JSON format.
//     Example: GET http://localhost:3000/files

//   2. GET /file/:filename - Returns content of given file by name
//      Description: Use the filename from the request path parameter to read the file from `./files/` directory
//      Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
//      Example: GET http://localhost:3000/file/example.txt

//     - For any other route not defined in the server return 404

//     Testing the server - run `npm run test-fileServer` command in terminal



// Import Express
const { error } = require('console');
const express = require('express');
const fs = require('fs')
const path = require('path');
const { json } = require('stream/consumers');

// Create an Express application
const app = express();

app.use(express.json());

// Define a route for the root URL
app.get('/files/:fileName', (req, res) => {
    const filePath = path.join(__dirname, "files", req.params.fileName);
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({err: "File not found"})
    } else {
        res.download(filePath) // <--- this triggers actual download
    }
});

//for list of files present inside the files folder
app.get('/files', (req, res) => {
    const folderPath = path.join(__dirname,"files")

    fs.readdir(folderPath, (err, files) => {
        if(err){
            res.status(500).json({msg: "Unable to read files"})
        }else {
            res.json({files}) //apparantly this provides files names in an array
        }
    })
});


app.post('/files', (req, res) => {
    const filePath = path.join(__dirname, "files", req.body.fileName);
    const data = req.body.content;
    if (!req.body.fileName) {
        return res.status(500).json({error: "Missing / Invalid fileName"})
    }else if (!req.body.content){
        return res.status(500).json({error: "Missing / Invalid Content"})
    }
    fs.writeFile(filePath, data, "utf-8", (err) => {
        if(err){
            res.status(500).json({err: "Unable to create a file"});
        }else{
            res.json({
                msg: "file written successfully"
            })
        }
    })
});


app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on 0.0.0.0:3000");
});





// app.put('/', (req, res) => {
    
// });

// // remoing all the unhealthy kidneys
// app.delete('/', (req, res) => {
    
// });
