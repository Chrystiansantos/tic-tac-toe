import { io } from "../app";
import { roomsCreate } from "../util/rooms";

interface IChangedBoardServiceDTO {
  room: string;
  board: string[];
  player: 'x' | 'o';
  changedNextPlayer?: boolean
}

export class ChangedBoardService {

  constructor() { }

  public async execute({ room, board, player, changedNextPlayer }: IChangedBoardServiceDTO) {

    const nextPlay = changedNextPlayer ?
      parseInt(String((Math.random() * 10) % 2)) == 0 ? 'x' : 'o' : player === 'x' ? 'o' : 'x';

    /* 
      0 1 2
      3 4 5
      6 7 8
    ------
      0 1 2 = vencedor
      0 4 8 = vencedor
      0 3 6 = vencedor
      3 4 5 = vencedor
      1 4 7 = vencedor
      2 4 6 = vencedor
      2 5 8 = vencedor
      6 7 8 = vencedor
    */

    let winner = null;

    if (![board[0], board[1], board[2]].includes('')
      && board[0] === board[1] && board[1] === board[2]) winner = board[0];
    if (![board[0], board[4], board[8]].includes('')
      && board[0] === board[4] && board[4] === board[8]) winner = board[0];
    if (![board[0], board[3], board[6]].includes('')
      && board[0] === board[3] && board[3] === board[6]) winner = board[0];
    if (![board[3], board[4], board[5]].includes('')
      && board[3] === board[4] && board[4] === board[5]) winner = board[3];
    if (![board[1], board[4], board[7]].includes('')
      && board[1] === board[4] && board[4] === board[7]) winner = board[1];
    if (![board[2], board[4], board[6]].includes('')
      && board[2] === board[4] && board[4] === board[6]) winner = board[2];
    if (![board[2], board[5], board[8]].includes('')
      && board[2] === board[5] && board[5] === board[8]) winner = board[2];
    if (![board[2], board[5], board[8]].includes('')
      && board[2] === board[5] && board[5] === board[8]) winner = board[2];
    if (![board[6], board[7], board[8]].includes('')
      && board[6] === board[7] && board[7] === board[8]) winner = board[6];

    if (winner) {
      if (winner === 'x') {
        roomsCreate[room].xWiner += 1;
      } else {
        roomsCreate[room].oWiner += 1;
      }
      const dataWiner = {
        event: 'winner',
        winner,
        winnerX: roomsCreate[room].xWiner,
        winnerO: roomsCreate[room].oWiner,
        ties: roomsCreate[room].ties
      }
      io.emit(room, dataWiner)
      return;
    }

    if (board.findIndex(el => el === '') === -1) {
      roomsCreate[room].ties += 1;
      const dataWiner = {
        event: 'tie',
        winnerX: roomsCreate[room].xWiner,
        winnerO: roomsCreate[room].oWiner,
        ties: roomsCreate[room].ties
      }
      io.emit(room, dataWiner)
      return;
    }
    const data = {
      event: 'updateBoard',
      board,
      nextPlay
    }

    io.emit(room, data)
  }
}