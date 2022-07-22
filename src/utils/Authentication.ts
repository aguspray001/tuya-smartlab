import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config as dotenv} from 'dotenv';

dotenv();

class Authentication {
    public static Passwordhash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    }

    public static PasswordCompare = (password: string, hashedPassword: string): Promise<boolean> => {
        return bcrypt.compare(password, hashedPassword);
    }

    public static generateToken = (data: any): string => {
        const secretKey: string = process.env.JWT_SECRET_KEY || "";
        const token = jwt.sign(data, secretKey);
        return token;
    }
}

export default Authentication;