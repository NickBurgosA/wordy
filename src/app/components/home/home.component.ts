import { Component, OnInit } from '@angular/core';
import {UserService} from "@service/user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  get hasUsers() {
    return this.userService.getUsers().length !== 0;
  }

  get users() {
    return this.userService.getUsers();
  }
}
