import { Request, Response, Router } from 'express';

import { CreateRoomsService } from '../services/createRoomsService';
import { DeleteRoomService } from '../services/deleteRoomService';

export const routesRoom = Router();

routesRoom.post('/create', async (req: Request, res: Response) => {
  const { room, icon } = req.body;

  try {
    const createRoomService = new CreateRoomsService();
    const data = await createRoomService.execute({
      icon,
      room,
    });

    return res.status(201).json(data)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

routesRoom.delete('/delete/:roomName', async (req: Request, res: Response) => {
  const { roomName } = req.params;
  try {
    const deleteRoomService = new DeleteRoomService();
    await deleteRoomService.execute({ roomName });

    return res.status(201).json({})
  } catch (error) {
    return res.status(500).send(error)
  }
})