import { cardModel } from '../models/card.model'
import { columnModel } from '../models/column.model'

const createNew = async (data) => {
  try {
    const newCard = await cardModel.createNew(data)
    await columnModel.pushCardOrder(newCard.columnId.toString(), newCard._id.toString())

    return newCard
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now()
    }
    if (updateData._id) delete updateData._id

    const updatedCard = await cardModel.update(id, updateData)

    return updatedCard
  } catch (error) {
    throw new Error(error)
  }
}

export const cardService = {
  createNew,
  update
}