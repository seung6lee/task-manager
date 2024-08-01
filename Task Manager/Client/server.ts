const express = require("express")
const path = require('path')
const fs = require('fs')
const fsp = fs.promises
const app = express()
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post('/login', (req, res) => {
    fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            grade: req.body.grade,
            classNumber: req.body.classNumber,
            number: req.body.number
        }),
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        })
})

app.post('/add', (req, res) => {
    console.log(req.body.name)
    fetch('http://127.0.0.1:8000/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: req.body.name,
            subject: req.body.subject,
            date: req.body.date,
            grade: req.body.grade
        }),
    })
        .then(ress => ress.json())
        .then(ress => res.json(ress))
        .then(ress => console.log(ress))
        .catch(error => {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        })
})

app.post('/remove', (req, res) => {
    console.log(req.body.name)
    fetch('http://127.0.0.1:8000/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: req.body.name,
        }),
    })
        .then(ress => ress.json())
        .then(ress => res.json(ress))
        .then(ress => console.log(ress))
        .catch(error => {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        })
})

app.post('/subjects', (req, res) => {
    console.log(req.body)
    fetch('http://127.0.0.1:8000/subjects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            korean: req.body.korean,
            math: req.body.math,
            society: req.body.society,
            science: req.body.science,
            english: req.body.english,
            history: req.body.history,
        }),
    })
        .then(ress => ress.json())
        .then(ress => res.json(ress))
        .then(ress => console.log(ress))
        .catch(error => {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        })
})

app.get('/all', (req, res) => {
    fetch('http://127.0.0.1:8000/', {
        method: 'GET',
    })
        .then(fastres => fastres.json())
        .then(fastres => res.json(fastres))
})

app.listen(1234, () => {
    console.log(`Server running at http://127.0.0.1:1234`)
})