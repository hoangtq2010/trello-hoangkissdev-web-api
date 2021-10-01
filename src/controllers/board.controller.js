// Lấy data truyền lên từ Client api thông qua body
import { boardService } from '../services/board.service'

import { HttpStatusCode } from '../utilities/constants'

const createNew = async (req, res) => {
  try {
    const result = await boardService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const getFullBoard = async (req, res) => {
  try {
    const { id } = req.params
    const result = await boardService.getFullBoard(id)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew,
  getFullBoard
}