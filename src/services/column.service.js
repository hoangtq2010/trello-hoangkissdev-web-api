import { columnModel } from '../models/column.model'
import { boardModel } from '../models/board.model'

const createNew = async (data) => {
  try {
    // transaction mongodb
    const newColumn = await columnModel.createNew(data)

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
    const result = await columnModel.update(id, updateData)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const columnService = {
  createNew,
  update
}