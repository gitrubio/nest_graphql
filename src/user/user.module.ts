import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    TypeOrmModule.forFeature([ User ])
  ],
  exports: [UserService]
})
export class UserModule {}
