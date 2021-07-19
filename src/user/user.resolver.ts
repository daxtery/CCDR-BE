import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Resolver(of => User)
export class UserResolver {

    constructor(private readonly userService: UserService) { }

    //@UseGuards(JwtAuthGuard)
    @Query(returns => [User])
    async getUsers(): Promise<User[]> {

        return await this.userService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => User)
    async getUser(@Args('email') email: string): Promise<User> {

        return await this.userService.findWithEmail(email);
    }

}