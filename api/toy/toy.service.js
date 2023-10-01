import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'

async function query(filterBy = {}, sortBy = '') {    
    try {
        const criteria = _buildFilterCriteria(filterBy)
        console.log('criteria:', criteria)
        const collection = await dbService.getCollection('toy')
        if (sortBy) {
            var toys = await collection.find(criteria).sort({ [sortBy]: 1 }).toArray()
        } else {
            var toys = await collection.find(criteria).toArray()
        }
        return toys

    } catch (err) {
        loggerService.error('cannot find toys', err)
        throw err
    }
}

function _buildFilterCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        criteria.name = { $regex: filterBy.txt, $options: 'i' }
    }
    if (filterBy.InStock === "true") {
        criteria.inStock = true
    }
    if (filterBy.InStock === "false") {
        criteria.inStock = false
    }
    if (filterBy.labels && filterBy.labels.length > 0) {
        criteria.labels = { $all: filterBy.labels };
    }
    return criteria

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
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        loggerService.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
    } catch (err) {
        loggerService.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        loggerService.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            name: toy.vendor,
            price: toy.price,
            labels: toy.labels,
            createdAt: toy.createdAt,
            inStock: toy.inStock
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        loggerService.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        loggerService.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        loggerService.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

export const toyService = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg
}
