import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../entity/user.entity';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async createUser(user: UserEntity) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async deleteUser(email: string) {
    this.userModel.deleteOne({ email }).exec();
  }
}
