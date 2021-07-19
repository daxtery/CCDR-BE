import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {  User } from './schemas/user.schema';

import { genSalt, hash } from 'bcrypt';


@Injectable()
export class UserService {

    saltRounds = 10;

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async hashPassword(plain: string): Promise<string> {
        const salt = await genSalt(this.saltRounds);
        return await hash(plain, salt);
    }

    async getUsers(): Promise<User[]> {

        return await this.userModel.find();
    }

    async findWithId(id: User['_id']): Promise<User> {

        return await this.userModel.findById(id);
    }

    async findWithEmail(email: string): Promise<User> {

        try {

            return await this.userModel.findOne({ 'email': email }).exec();

        } catch (err) {

            return null;
        }

    }

    async findManyWithId(ids: User['_id'][]): Promise<User[]> {

        return await this.userModel.find({ _id: { $in: ids } });
    }

}
