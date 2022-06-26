import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {GameComponent} from "./components/game/game.component";
import {FormStartComponent} from "./components/form-start/form-start.component";
import {LobbyComponent} from "./components/lobby/lobby.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: FormStartComponent},
      { path: 'lobby', component: LobbyComponent },
      {
        path: 'game',
        component: GameComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
