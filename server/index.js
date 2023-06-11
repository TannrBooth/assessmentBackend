const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { 
    getCompliment,
    getFortune,
    displayList,
    createChar,
    deleteChar,
    changeName
} = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/characters",displayList);
app.post('/api/characters', createChar);
app.delete('/api/characters/:id', deleteChar);
app.put('/api/characters/:id', changeName)

app.listen(4000, () => console.log("Server running on 4000"));
