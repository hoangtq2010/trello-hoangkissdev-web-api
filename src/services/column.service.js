import { columnModel } from '../models/column.model'
import { boardModel } from '../models/board.model'
import { cardModel } from '../models/card.model'

const createNew = async (data) => {
  try {
    // transaction mongodb
    const newColumn = await columnModel.createNew(data)
    newColumn.cards = []
    // update columnOrder Array in board collection
    await boardModel.pushColumnOrder(newColumn.boardId.toString(), newColumn._id.toString())

    return newColumn
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
    if (updateData.cards) delete updateData.cards

    const updatedColumn = await columnModel.update(id, updateData)

    if (updatedColumn._destroy) {
      // delete many card in this column
      cardModel.deleteMany(updatedColumn.cardOrder)
    }
    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}

export const columnService = {
  createNew,
  update
}