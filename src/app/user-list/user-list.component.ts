import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('listAnimation', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ])
    ])
  ]
})

export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  clickedUsers: number[] = [];
  searchText!: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.users = this.filteredUsers = this.userService.getUsers();
  }

  onSearchFieldChange() {
    if (this.searchText.length >= 3) {
      this.filteredUsers = this.userService.filterUsers(this.searchText);
    } else {
      this.filteredUsers = this.users;
    }
  }

  onSortByAge() {
    this.filteredUsers = this.userService.sortUsersByAge(this.filteredUsers);
  }

  onShowExtraInfo(userId: number) {
    this.clickedUsers.push(userId);
  }
}
