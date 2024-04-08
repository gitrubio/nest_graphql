import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt'

import { LoginInput, SignupInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

constructor(
    private readonly userService : UserService
) {}

async signUp(SignupInput: SignupInput) : Promise<AuthResponse> {

    const user = await this.userService.create(SignupInput);
    
    const token = 'ABC123'
    return {
        token,
        user
    };
}
async login(LoginInput: LoginInput) : Promise<AuthResponse> {
    const { email, password } = LoginInput;
    const user = await this.userService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
        throw new BadRequestException('Invalid credentials');
    }

    return {
        token: 'ABC123',
        user: user
    };
}

}
