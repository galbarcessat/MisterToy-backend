// import fs from 'fs'
// import { utilService } from './util.service.js'

// const toys = utilService.readJsonFile('data/toy.json')

// export const toyService = {
//     query,
//     get,
//     remove,
//     save
// }

// function query(filterBy = {}, sortBy = '') {
//     let toysToDisplay = toys
//     if (filterBy.txt) {
//         const regExp = new RegExp(filterBy.txt, 'i')
//         toysToDisplay = toys.filter(toy => regExp.test(toy.name))
//     }
//     if (filterBy.InStock === "true") {
//         console.log('filter InStock:')
//         toysToDisplay = toys.filter(toy => toy.inStock)
//     }
//     if (filterBy.InStock === "false") {
//         console.log('filter NOT InStock:')
//         toysToDisplay = toys.filter(toy => !toy.inStock)

//     }
//     if (filterBy.labels && filterBy.labels.length > 0) {
//         toysToDisplay = toys.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)));
//     }

//     if (sortBy === 'name') {
//         toysToDisplay = toys.sort((toy1, toy2) => {
//             return toy1.name.localeCompare(toy2.name)
//         })
//     } else if (sortBy === 'price') {
//         toysToDisplay = toys.sort((a, b) => a.price - b.price)
//     } else if (sortBy === 'CreatedAt') {
//         toysToDisplay = toys.sort((a, b) => a.CreatedAt - b.CreatedAt)
//     }

//     return Promise.resolve(toysToDisplay)
// }

// function get(toyId) {
//     const toy = toys.find(toy => toy._id === toyId)
//     if (!toy) return Promise.reject('Toy not found!')
//     toy.msgs = 'Hello this is a message'
//     return Promise.resolve(toy)
// }

// function remove(toyId) {
//     const idx = toys.findIndex(toy => toy._id === toyId)
//     if (idx === -1) return Promise.reject('No Such Toy')
//     const toy = toys[idx]
//     toys.splice(idx, 1)
//     return _saveToysToFile()

// }

// function save(toy) {
//     if (toy._id) {
//         const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
//         toyToUpdate.name = toy.name
//         toyToUpdate.price = toy.price
//         toyToUpdate.labels = toy.labels
//         toyToUpdate.inStock = toy.inStock
//     } else {
//         toy._id = _makeId()
//         toys.push(toy)
//     }

//     return _saveToysToFile().then(() => toy)
// }

// function _makeId(length = 5) {
//     let text = '';
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// }

// function _saveToysToFile() {
//     return new Promise((resolve, reject) => {

//         const toysStr = JSON.stringify(toys, null, 4)
//         fs.writeFile('data/toy.json', toysStr, (err) => {
//             if (err) {
//                 return console.log(err);
//             }
//             console.log('The file was saved!');
//             resolve()
//         });
//     })
// }

