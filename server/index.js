const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {getItems, detailSearch, deleteItem, createItem, updateItem} = require('./controller')

// ENDPOINTS -------------------------------------------

app.get('/api/items', getItems)
app.post('/api/searchitems', detailSearch)
app.delete('/api/items/:id', deleteItem)
app.post('/api/items', createItem)
app.put('/api/items/:id', updateItem)

//  ----------------------------------------------------

const SERVER_PORT = 4000
app.listen(SERVER_PORT, console.log(`Pinging on port ${SERVER_PORT}`))