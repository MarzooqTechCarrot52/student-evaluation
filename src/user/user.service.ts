import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserDTO } from './user.dto';
import type { User } from './user.interface';

@Injectable()
export class UserService {
  // Local in-memory store for this service only
  private users = new Map<string, User>();

  // Create a new user
  createUser(user: UserDTO) {
    const id = randomUUID();
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  // Get all users
  getUser(): User[] {
    return Array.from(this.users.values());
  }

  // Get a single user by ID
  getOne(id: string): User | undefined {
    return this.users.get(id);
  }

  // Update a user by ID
  updateUser(id: string, body: Partial<User>): User {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUser: User = {
      ...existingUser,
      ...body,
      id: existingUser.id, // ensure ID never changes
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Delete a user by ID
  deleteUser(id: string): User | undefined {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      return undefined;
    }
    this.users.delete(id);
    return existingUser;
  }
}
