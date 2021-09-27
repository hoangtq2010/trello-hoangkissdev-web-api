import { boardModel } from '../models/board.model'
const createNew = async (data) => {
  try {
    const result = await boardModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = { createNew }