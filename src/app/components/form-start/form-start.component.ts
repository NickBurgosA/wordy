import { Component, OnInit } from '@angular/core';
import {UserService} from "@service/user/user.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-form-start',
  templateUrl: './form-start.component.html',
  styleUrls: ['./form-start.component.scss']
})
export class FormStartComponent implements OnInit {

  public name: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser() {
    this.userService.addDefaultUser(this.name)
    this.router.navigate(['/lobby'])
  }

}
