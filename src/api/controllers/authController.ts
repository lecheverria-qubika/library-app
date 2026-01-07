import { Request, Response } from 'express';
import { AuthService } from '../../services/authService';

export class AuthController {

  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response): Promise<void> => {

    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
        return;
      }

      const  { statusCode, ...result } = await this.authService.login(username, password);
      res.status(statusCode).json(result);

    } catch (error: any) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {

    try {

      const { username, password, role } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
        return;
      }

      const { statusCode, ...result } = await this.authService.register(username, password, role);
      res.status(statusCode).json(result);

    } catch (error: any) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}

