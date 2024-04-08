import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/auth-response.types';
import { SignupInput, LoginInput} from './dto/inputs';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // Add the login mutation here
  @Mutation(() => AuthResponse, { name: 'signUp' })
  async signup(@Args('signinInput') signinInput: SignupInput): Promise<AuthResponse> {
    return this.authService.signUp(signinInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  /* @Query(() => Auth, { name: 'refreshToken' })
  async refreshToken(@Args('refreshToken') refreshToken: string): Promise<Auth> {
    return this.authService.refreshToken();
  } */
}
