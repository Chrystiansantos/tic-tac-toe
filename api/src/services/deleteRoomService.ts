import { roomsCreate } from "../util/rooms"

interface IDeleteRoomServiceDTO {
  roomName: string
}

export class DeleteRoomService {

  constructor() { }

  public async execute({ roomName }: IDeleteRoomServiceDTO) {
    if (roomsCreate[roomName]) {
      delete roomsCreate[roomName];
    }
    return {
      message: 'Room deletada com sucesso',
    }
  }
} 