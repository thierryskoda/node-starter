import { ObjectId } from 'mongodb'

import Item from './item.model'
import {respondWithResult, handleError} from '../../utility/general'

export function index(req, res) {
	return Item.find({})
		.then(respondWithResult(res))
		.catch(handleError(res))
}

export function create(req, res) {
	return Item.create(req.body)
		.then(respondWithResult(res))
		.catch(handleError(res))
}

export function remove(req, res) {
	const {todoId} = req.params
	return Item.remove({_id: new ObjectId(todoId)})
		.then(() => Promise.resolve({_id: todoId}))
		.then(respondWithResult(res))
		.catch(handleError(res))
}