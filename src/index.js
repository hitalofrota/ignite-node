const express = require('express');

const app = express();

app.get("/courses", (request, response) => {
    return response.json([
        "Curso 1", 
        "Curso 2", 
        "Curso 3"
    ])
})

app.post("/courses", (request, response) => {
    return response.json([
        "Curso 1", 
        "Curso 2", 
        "Curso 3",
        "Curso 4"
    ])
})

app.put("/courses/:id", (request, response) => {
    return response.json([
        "Curso 1", 
        "Curso 2", 
        "Curso 3",
        "Curso 17"
    ])
})

app.patch("/courses/:id", (request, response) => {
    return response.json([
        "Curso 1", 
        "Curso 2", 
        "Curso 25",
        "Curso 17"
    ])
})

app.delete("/courses/:id", (request, response) => {
    return response.json([
        "Curso 1", 
        "Curso 2", 
    ])
})

app.listen(3333)

