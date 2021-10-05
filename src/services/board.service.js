import { boardModel } from '../models/board.model'
import { cloneDeep } from 'lodash'

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

    const transformBoard = cloneDeep(board)
    // Filter deleted columns
    transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)

    //Add card to each column
    transformBoard.columns.forEach(column => {
      column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
    })
    //sort columns by columnOrder, sort cards by cardOrder, this step will pass to frontend dev
    //remove cards data from boards
    delete transformBoard.cards
    return transformBoard
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
    if (updateData.columns) delete updateData.columns

    const updatedBoard = await boardModel.update(id, updateData)

    return updatedBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createNew,
  getFullBoard,
  update
}