import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameHomeComponent } from './game-home/game-home.component';

const routes: Routes = [
  { path: '', component: GameHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
