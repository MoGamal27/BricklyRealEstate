import { UserRole } from '../../common/enums';
export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
    phone?: string;
}
