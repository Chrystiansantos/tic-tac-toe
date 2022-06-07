import { Router } from 'express'
import { routesBoard } from './board.routes';
import { routesRoom } from './room.routes'

const routes = Router();

routes.use('/room', routesRoom)
routes.use('/board', routesBoard)

export { routes }