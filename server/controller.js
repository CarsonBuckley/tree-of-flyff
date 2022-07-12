const items = require('./db.json')

let globalID = 3

module.exports = {
    getItems: (req, res) => {
        res.status(200).send(items)
    },
    deleteItem: (req, res) => {
        let index = items.findIndex(elem => elem.id === +req.params.id)
        items.splice(index, 1)
        res.status(200).send(items)
    },
    createItem: (req, res) => {
        // console.log(req.body)
        const {name, price, server, sellerIGN, imageURL} = req.body
        let newItem = {
            id: globalID,
            name: name,
            price: +price,
            server: server,
            sellerIGN: sellerIGN,
            imageURL: imageURL
        }
        items.push(newItem)
        globalID++
        console.log(items)
        res.status(200).send(items)
    },
    updateItem: (req, res) => {
        const {type} = req.body
        let index = items.findIndex(elem => elem.id === +req.params.id)

        console.log(type)
        if (type === 'minus' && items[index].price > 1) {
            items[index].price -= 1
            res.status(200).send(items)
        } else if (type === 'plus' && items[index].price < 5) {
            items[index].price += 1
            res.status(200).send(items)
        } else {
            res.status(400).send('Invalid price')
        }
        
    },
    detailSearch: (req, res) => {
        const {searchTerm} = req.body
        console.log(searchTerm)
        return
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("searchbar").value;
        filter = input.value.toUpperCase();
        // ul = document.getElementById("myUL");
        // li = ul.getElementsByTagName("li");
    
        let results = items.filter(item => item.name.startsWith(filter))
    
        console.log('adfoighd')
        res.status(200).send(results)
    
    }
}

