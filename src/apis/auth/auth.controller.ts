import { Request, Response, NextFunction } from 'express'

class AuthController {
  /**
   * 获取个人简介
   */
  public static async getProfile(req: Request, res: Response, next: NextFunction) {
    const user = req.user

    const profile = {
      email: user.email,
      role: user.role
    }

    return res.send({ profile })
  }
}

export { AuthController }
