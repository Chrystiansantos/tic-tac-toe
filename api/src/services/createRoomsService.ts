
import { io } from '../app'
import { roomsCreate } from '../util/rooms';

interface ICreateRoomsServiceDTO {
  room: string;
  icon: 'x' | 'o';
}

export class CreateRoomsService {

  constructor() { }

  async execute({ icon, room }: ICreateRoomsServiceDTO) {
    try {
      if (room && roomsCreate[room] && icon) {
        throw new Error('Nao e possivel criar está sala tente outro nome')
      }

      if (room && icon) {
        if (icon === 'x') {
          roomsCreate[room] = { iconX: true, oWiner: 0, xWiner: 0, ties: 0 }
        } else {
          roomsCreate[room] = { iconO: true, oWiner: 0, xWiner: 0, ties: 0 }
        }
        return {
          message: 'Room create',
          success: true,
          icon: icon
        }
      }
      if (room) {
        const { iconX } = roomsCreate[room];
        
        io.emit(room, 'layerIsOn');

        if (iconX) {
          return {
            message: 'connectRoom',
            success: true,
            icon: 'o'
          }
        }

        return {
          message: 'connectRoom',
          success: true,
          icon: 'x'
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}