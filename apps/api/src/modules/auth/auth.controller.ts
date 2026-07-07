import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { AuthService } from './auth.service';
import { TOKENS } from '../../container/tokens';
import { successResponse } from '../../common/responses/success-response';
import { asyncHandler } from '../../common/utils/async-handler';
import { HttpStatus } from '../../common/constants/http-status';
import { UnauthorizedException } from '../../common/exceptions/unauthorized.exception';

@injectable()
export class AuthController {
  constructor(
    @inject(TOKENS.AuthService)
    private readonly authService: AuthService,
  ) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);
    return successResponse(res, 201, 'User registered successfully', result);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);
    return successResponse(
      res,
      HttpStatus.OK,
      'User logged in successfully',
      result,
    );
  });

  getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.userId;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    const result = await this.authService.getCurrentUser(userId);

    return successResponse(
      res,
      HttpStatus.OK,
      'User retrieved successfully',
      result,
    );
  });
}
