import {Request, Response} from 'express'

async function getHello(req: Request, res: Response): Promise<void> {
  res.send('Hello World!')
}

export { getHello }