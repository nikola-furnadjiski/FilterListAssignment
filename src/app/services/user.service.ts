import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {USERS} from '../constants/users.data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = USERS;

  constructor() { }

  getUsers(): User[] {
    return this.users.map((user:User) => {
      return {
        ...user,
        initials: user.firstname.charAt(0)+user.lastname.charAt(0)
      }
    });
  }

  filterUsers(searchTerm: string): User[] {
    return this.users.filter((user) => {
      return user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || user.lastname.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }

  sortUsersByAge(users: User[]): User[] {
    return users.sort((a: User, b: User) => {
      return a.age < b.age ? -1 : 1;
    })
  }
}
