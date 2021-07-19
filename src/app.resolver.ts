import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth/auth.service";
import { AuthResult } from "./auth/dtos/auth-result.dto";
import { UserValidation } from "./auth/dtos/user-validation.dto";

@Resolver()
export class AppResolver {

    constructor(private readonly authService: AuthService) {}

    @Mutation(returns => AuthResult)
    async loginEmail(@Args('user') user: UserValidation): Promise<AuthResult> {

        return await this.authService.login(user);
    }
}