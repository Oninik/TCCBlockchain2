import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'node_modules/ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaglogComponent } from './paglog/paglog.component';
import { MenuiniComponent } from './menuini/menuini.component';
import { PagregComponent } from './pagreg/pagreg.component';
import { PaguserComponent } from './paguser/paguser.component';
import { PagcriarComponent } from './pagcriar/pagcriar.component';
import { PagapuComponent } from './pagapu/pagapu.component';
import { PagmodComponent } from './pagmod/pagmod.component';
import { PagvotComponent } from './pagvot/pagvot.component';
import { PagresComponent } from './pagres/pagres.component';
import { PagselvotComponent } from './pagmod/pagselvot/pagselvot.component';
import { PagselmodComponent } from './pagmod/pagselmod/pagselmod.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pagcriar2Component } from './pagcriar/pagcriar2/pagcriar2.component';

@NgModule({
  declarations: [
    AppComponent,
    PaglogComponent,
    MenuiniComponent,
    PagregComponent,
    PaguserComponent,
    PagcriarComponent,
    PagapuComponent,
    PagmodComponent,
    PagvotComponent,
    PagresComponent,
    PagselvotComponent,
    PagselmodComponent,
    Pagcriar2Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    ChartsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
