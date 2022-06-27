import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  words: Word[] = [
    { id: 1, name: 'ARTHUR', categoryId: 1, isUsed: false },
    { id: 2, name: 'TOMMY', categoryId: 1, isUsed: false },
    { id: 3, name: 'ORDER', categoryId: 1, isUsed: false },
    { id: 4, name: 'FUCKING', categoryId: 1, isUsed: false },
  ]

  categories: Category[] = [
    { id: 1, name: 'Peaky Blinders' },
    { id: 2, name: 'Anime' },
    { id: 3, name: 'Series' },
  ]
  constructor() { }

}
