const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let notes = [
	{
		id: "1",
		content: "Nootti 1",
		important: true
	},
	{
		id: "2",
		content: "Notes 2",
		important: false
	},
	{
		id: "3",
		content: "asdlfkjas dfljkas",
		important: true
	}
]

const generateId = () => {
	const maxId = notes.length > 0 
		? Math.max(...notes.map(n => Number(n.id)))
		: 0
	return String(maxId + 1)
}

app.get('/', (request, response) => {
	response.send('<h1>Hello</h1>')
})

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.post('/api/notes',(request,response) => {
	
	const body = request.body
	if(!body.content) {
		return response.status(400).json({
			error: 'Content is missing'
		})
	}

	const note = {
		content: body.content,
		important: body.important || false,
		id: generateId(),
	}
	
	notes = notes.concat(note)

	console.log("XXX: ", note)
	console.log(request.headers)
	response.json(note)
})

app.get('/api/notes/:id',(request,response) => {
	const id = request.params.id
	const note = notes.find(note => note.id === id)

	if(note) {
		response.json(note)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/notes/:id', (request,response) => {
	const id = request.params.id
	notes = notes.filter(note => note.id !== id)

	response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Sserver running on port ${PORT}!`)
})