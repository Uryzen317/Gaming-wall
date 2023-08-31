import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { GameSectionComponent } from './game-section/game-section.component';
import { FooterComponent } from './footer/footer.component';
import { WallpaperDetailsComponent } from './wallpaper-details/wallpaper-details.component';
import { PanelModule } from './panel/panel.module';
import { GamesListComponent } from './games-list/games-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WallpaperDetailsByIdComponent } from './wallpaper-details-by-id/wallpaper-details-by-id.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { ReplieComponent } from './replie/replie.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { environment } from "src/environments/environment";
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    GameSectionComponent,
    FooterComponent,
    WallpaperDetailsComponent,
    WallpaperDetailsByIdComponent,
    GamesListComponent,
    CommentsComponent,
    ReplieComponent,
  ],
  imports: [
    BrowserModule, 
    PanelModule,
    UsersModule, 
    AppRoutingModule, 
    ReactiveFormsModule, 
    RecaptchaV3Module, 
    LoadingBarRouterModule
  ],
  providers: [{ provide : LocationStrategy , useClass : HashLocationStrategy}, { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha}],
  bootstrap: [AppComponent],
})
export class AppModule {}
