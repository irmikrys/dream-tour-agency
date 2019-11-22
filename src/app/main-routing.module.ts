import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WycieczkiComponent} from './components/wycieczki/wycieczki.component';
import {WycieczkaComponent} from './components/wycieczka/wycieczka.component';

const routes: Routes = [
  {path: 'trips', component: WycieczkiComponent},
  {path: 'trip/:id', component: WycieczkaComponent},
  {
    path: '',
    redirectTo: '/trips',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
