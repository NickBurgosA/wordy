import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/user";
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'current_user';

  private _users = new BehaviorSubject<User[]>([]);

  private currentUser?: User = undefined;

  public readonly users: Observable<Array<User>> = this._users.asObservable();

  constructor() {
    if (localStorage.getItem(this.USER_KEY)) {
      const users = JSON.parse(localStorage.getItem(this.USER_KEY)!!) as User[];
      this._setUsers(users);
    }

    if (localStorage.getItem(this.CURRENT_USER_KEY)) {
      const uid = localStorage.getItem(this.CURRENT_USER_KEY)!!;
      this.currentUser = this.getUsers().find(u => u.id == JSON.parse(uid));
      console.log(this.currentUser);
    }
  }

  getUsers(): User[] {
    return this._users.getValue();
  }

  private _setUsers(users: User[]) {
    this._users.next(users);
  }

  addUser(user: User) {
    const users = [...this.getUsers(), user];
    this._setUsers(users);
    this.store(this.USER_KEY, users);
  }

  addDefaultUser(name: string) {
    const user: User = { name, gamesPlayed: 0, id: uuid.v4(), wins: 0 };
    this.addUser(user);
  }

  updateUser(user: User) {
    const idx = this.getUsers().findIndex(u => u.id === user.id);
    const users = this.getUsers();
    users[idx] = user;
    this._setUsers(users);
    this.store(this.USER_KEY, users);
  }

  setCurrentUser(user: User){
    this.currentUser = user;
    this.store(this.CURRENT_USER_KEY, user.id);
  }

  getCurrentUser(): User {
    return this.currentUser!!;
  }

  private store(key: string, item: any){
    localStorage.setItem(key, JSON.stringify(item));
  }
}
