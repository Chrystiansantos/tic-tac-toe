import { Request, Response, Router } from 'express';
import { ChangedBoardService } from '../services/changedBoardService';

export const routesBoard = Router();

routesBoard.post('/moviment-board', async (req: Request, res: Response) => {
  const { room, player, boardChanged, changedNextPlayer } = req.body;

  try {
    const changedBoardService = new ChangedBoardService();
    await changedBoardService.execute({
      room,
      player,
      board: boardChanged,
      changedNextPlayer,
    })

    return res.json({});

  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})