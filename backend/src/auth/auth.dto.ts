import { UserRole } from '../user/user.entity';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  role?: UserRole;
}
