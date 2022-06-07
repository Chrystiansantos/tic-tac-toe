interface IRoomCreate {
  [key: string]: {
    iconX?: boolean;
    iconO?: boolean;
    xWiner: number,
    oWiner: number;
    ties: number;
  }
}

export const roomsCreate: IRoomCreate = {};