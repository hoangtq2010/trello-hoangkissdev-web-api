import Joi from 'joi'
import { getDB } from '../config/mongodb'
import { ObjectId } from 'mongodb'
import { columnModel } from './column.model'
import { cardModel } from './column.model'


// Define Board collection
const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
  try {
    const result = await getDB().collection(boardCollectionName).findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(boardCollectionName).insertOne(value)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }
    const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )


    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
      { _id: ObjectId(boardId) },
      { $push: { columnOrder: columnId } },
      { returnDocument: 'after' }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

// aggregate, $lookup, $addFields
const getFullBoard = async (boardId) => {
  try {
    const result = await getDB().collection(boardCollectionName).aggregate([
      { $match: {
        _id: ObjectId(boardId),
        _destroy: false
      }
      },
      // {
      //   $addFields: { //Add field vào quá trình query trả về data, nếu trùng key(vd: id) nó ghi đè chỉ trong qt query
      //     _id: { $toString: '$_id' } //chuyển đổi giá trị hiện tại $_id đang ObjectId của board về string
      //   }
      // },
      { $lookup: {
        from: columnModel.columnCollectionName, //collection name
        localField: '_id',
        foreignField: 'boardId',
        as: 'columns'
      } },
      { $lookup: {
        from: cardModel.cardCollectionName, //collection name
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray()


    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  createNew,
  update,
  pushColumnOrder,
  getFullBoard,
  findOneById
}