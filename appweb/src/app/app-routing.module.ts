import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuiniComponent } from './menuini/menuini.component';
import { PaglogComponent } from './paglog/paglog.component';
import { PagregComponent } from './pagreg/pagreg.component';
import { PagcriarComponent } from './pagcriar/pagcriar.component';
import { PagmodComponent } from './pagmod/pagmod.component';
import { PaguserComponent } from './paguser/paguser.component';
import { PagvotComponent } from './pagvot/pagvot.component';
import { PagresComponent } from './pagres/pagres.component';
import { PagapuComponent } from './pagapu/pagapu.component';
import { Pagcriar2Component } from './pagcriar/pagcriar2/pagcriar2.component';

const routes: Routes = [
  {path: '', component: MenuiniComponent},
  {path: 'paglog', component: PaglogComponent},
  {path: 'pagreg', component: PagregComponent},
  {path: 'pagcriar', component: PagcriarComponent},
  {path: 'pagmod', component: PagmodComponent},
  {path: 'paguser', component: PaguserComponent},
  {path: 'pagvot', component: PagvotComponent},
  {path: 'pagres', component: PagresComponent},
  {path: 'pagapu', component: PagapuComponent},
  {path: 'pagcriar2', component: Pagcriar2Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
