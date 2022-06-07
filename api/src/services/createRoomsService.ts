
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

      } else {
        if (room) {
          const { iconO, iconX } = roomsCreate[room];
          if (iconX) {
            io.emit(room, 'layerIsOn')
            return {
              message: 'connectRoom',
              success: true,
              icon: 'o'
            }
          }
          if (iconO) {
            io.emit(room, 'layerIsOn')
            return {
              message: 'connectRoom',
              success: true,
              icon: 'x'
            }
          }
        }
      }

      return {
        message: 'Room create',
        success: true,
        icon: icon
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}