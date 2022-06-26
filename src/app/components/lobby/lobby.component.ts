import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "@service/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }

  goToGame(user: User){
    this.userService.setCurrentUser(user);
    this.router.navigate(['/game']);
  }
}
