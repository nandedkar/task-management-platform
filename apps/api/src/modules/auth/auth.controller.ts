import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { AuthService } from './auth.service';
import { TOKENS } from '../../container/tokens';

@injectable()
export class AuthController {
  constructor(
    @inject(TOKENS.AuthService)
    private readonly authService: AuthService,
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body);
      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
