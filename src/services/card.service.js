import { cardModel } from '../models/card.model'
import { columnModel } from '../models/column.model'

const createNew = async (data) => {
  try {
    const createdCard = await cardModel.createNew(data)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId.toString())

    await columnModel.pushCardOrder(getNewCard.columnId.toString(), getNewCard._id.toString())

    return getNewCard
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