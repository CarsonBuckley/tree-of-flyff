const itemsContainer = document.getElementById('items-container')
const form = document.getElementById('create-item-form')
const searchBar = document.getElementById('searchbar')

const baseURL = `http://localhost:4000/api/items`

const itemsCallback = ({ data: items }) => displayItems(items)
const errCallback = err => {
    console.log('Error happened:')
    console.log(err.response.data)
}

const getAllItems = () => axios.get(baseURL).then(itemsCallback).catch(errCallback)
const createItem = body => {
    console.log('hello')
    axios.post(baseURL, body).then(itemsCallback).catch(errCallback)
}
const deleteItem = id => axios.delete(`${baseURL}/${id}`).then(itemsCallback).catch(errCallback)
const updateItem = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(itemsCallback).catch(errCallback)
const detailSearch = () => {
    let body = {}

    body.searchTerm = searchBar.value

    axios.post(`http://localhost:4000/api/searchitems`, body).then(itemsCallback).catch(errCallback)
}

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#name')
    let price = document.querySelector('#price')
    let server = document.querySelector('#server')
    let sellerIGN = document.querySelector('#sellerIGN')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        price: price.value,
        server: server.value,
        sellerIGN: sellerIGN.value,
        imageURL: imageURL.value
    }

    createItem(bodyObj)

    name.value = ''
    price.checked = false
    server.value = ''
    sellerIGN.value = ''
    imageURL.value = ''
}

function createItemCard(item) {
    const itemCard = document.createElement('div')
    itemCard.classList.add('item-card')

    
    itemCard.innerHTML = `<img alt='item icon' src=${item.imageURL} class="item-icon"/>
    <div class="item-data">
        <p class="item-name">${item.name}</p>
        <p class="item-price">${item.price}</p>
        <p class="item-sellerIGN">Seller: ${item.sellerIGN}</p>
        <p class="item-server">Server: ${item.server}</p>
    </div>
    
    <div class="sold-button">
        <button onclick="deleteItem(${item.id})">Mark as sold</button>
    </div>
    `

    console.log('ITEM POSTED ✅')
    itemsContainer.appendChild(itemCard)
}

function displayItems(arr) {
    itemsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createItemCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
searchBar.addEventListener('keyup', detailSearch)

getAllItems()