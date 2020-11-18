/*
npm start tai npm run dev
http://localhost:3001/api/persons
tehtävässä 3.2 rivinvaihto tehdään antamalla: "<br>"
tehtävässä 3.3 puuttuva id palauttaa 404
tehtävässä 3.4 poistettu id palauttaa 204. Kun postmanilla annetaan DELETE id=2, person ei enää näy listalla.
tehtävässä 3.9 frontendissä on muutettu persons.js: const baseUrl = '/api/persons'
               ja App.js funktiossa useEffect(): .get('http://localhost:3001/api/persons')
               REST client pyynnöt onnistuvat: GET palauttaa nimiluettelon
               ja POST palauttaa statuksen 200 refressauksen jälkeen.
               DELETE on blocked.
*/
const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let persons = [
    { 
      name: "Arto Hellas", 
      number: "040-123456",
      id: 1
    },
    { 
      name: "Ada Lovelace...", 
      number: "39-44-5323523",
      id: 2
    },
    { 
      name: "Dan Abramov", 
      number: "12-43-234345",
      id: 3
    },
    { 
      name: "Mary Poppendieck", 
      number: "39-23-6423122",
      id: 4
    }
]

app.get('/', (req, res) => {
res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
res.json(persons)
})

app.get('/info', (req, res) => {
    var date = new Date();
    var lkm = persons.length
    var message = 'Phonebook has info for ' + lkm + ' people  '  + "<br>" + "<br>" + date 
    res.send(message)
    console.log('date:', date)
    console.log('lukumäärä:', lkm)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
//    const note = notes.find(note => {
//        console.log(note.id, typeof note.id, id, typeof id, note.id === id)
//        return note.id === id
//    })
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    console.log(person)
    response.json(person)
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id != id)

    response.json(persons)
    response.status(204).end()
})

const generatedId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if ((!body.name) || (!body.number)) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const checkperson = persons.find(checkperson => checkperson.name === body.name)
    if (checkperson) {
        return response.status(400).json({
            error: 'name must unique'
        })
        //response.json(person)
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getRandomInt(10000),
    }

    persons = persons.concat(person)

    response.json(person)
})


//const port = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

