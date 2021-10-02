import { boardModel } from '../models/board.model'
const createNew = async (data) => {
  try {
    const result = await boardModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (boardId) => {
  try {
    const board = await boardModel.getFullBoard(boardId)

    if (!board || !board.columns) {
      throw new Error('Board not found!')
    }

    //Add card to each column
    board.columns.forEach(column => {
      column.cards = board.cards.filter(c => c.columnId.toString() === column._id.toString())
    })
    //sort columns by columnOrder, sort cards by cardOrder, this step will pass to frontend dev
    //remove cards data from boards
    delete board.cards
    return board
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createNew,
  getFullBoard
}