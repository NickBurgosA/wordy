import {Component, OnInit} from '@angular/core';
import {DataService} from "@service/data/data.service";
import GameProperties from "./game.properties";
import {UserService} from "@service/user/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  wordLength: number[] = [];
  tries: number[] = [];
  currentWord: string = '';
  wordTries: string[] = [];
  typedWord: string = '';
  results: Array<number[]> = [];
  currentTry: number = 0;
  hasWin: boolean = false;
  isFinish = false;

  constructor(private dataService: DataService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadWord();
  }

  loadWord() {
    this.currentWord = this.dataService.words[Math.floor(Math.random() * this.dataService.words.length)].name;
    this.wordLength = [...Array(this.currentWord.length).keys()];
    [...Array(this.nTries).keys()].forEach(x => {
      this.wordTries.push('');
      this.results.push(this.wordLength.map(() => 0))
    });
    console.log(this.currentWord);
    console.log(this.wordLength)
  }

  get nTries() {
    return GameProperties.tries;
  }

  submitWord() {
    if (this.currentWord.length !== this.typedWord.length) return;
    const letters = this.wordLength.map(i => this.currentWord[i]);
    for (let i = 0; i < this.typedWord.length; i++) {
      if (letters.includes(this.typedWord[i].toLocaleUpperCase())) {
        this.results[this.currentTry][i] = 2;
      }
      if (letters[i].toLocaleUpperCase() === this.typedWord[i].toLocaleUpperCase()) {
        this.results[this.currentTry][i] = 1;
      }
    }
    this.validateWin();
    this.wordTries[this.currentTry] = this.typedWord;
    this.currentTry += 1;
    this.typedWord = '';

  }

  getSquareClasses(result: number) {
    return {'green': result === 1, 'red': result === 2}
  }

  validateWin() {
    this.isFinish = this.currentTry + 1 === this.nTries;
    if (!this.isFinish) return;
    const user = this.userService.getCurrentUser();
    if (this.currentWord.toLocaleUpperCase() === this.typedWord.toLocaleUpperCase()) {
      this.hasWin = true;
      user.wins += 1;
    }
    this.finishGame(user);
  }

  finishGame(user: User) {
    user.gamesPlayed += 1;
    this.userService.updateUser(user);
    setTimeout(() => {
      this.router.navigate(['/lobby'])
    }, 1000)
  }

}
