import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Routing module
import {Routes, RouterModule} from "@angular/router";

import { AuthModule } from "./auth/auth.module";
import { MainModule } from "./main/main.module";
import { AppComponent } from './app.component';
import {MainComponent} from "./main/main.component";

// Http modules
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  // { path: '', pathMatch: 'full', redirectTo: 'movies' },
];


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AuthModule,
    MainModule,
    HttpClientModule,
    // AngularFontAwesomeModule,
    RouterModule.forRoot(routes),

    // Fontawesome
    FontAwesomeModule,

  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
