import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './games-list/games-list.component';
import { IndexComponent } from './index/index.component';
import { WallpaperDetailsByIdComponent } from './wallpaper-details-by-id/wallpaper-details-by-id.component';
import { WallpaperDetailsComponent } from './wallpaper-details/wallpaper-details.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'games/:name', redirectTo: 'games/:name/0', pathMatch: 'full' },
  { path: 'games/:name/:page', component: GamesListComponent },
  { path: 'wallpaper/:name/:index', component: WallpaperDetailsComponent },
  { path: 'wallpaperById/:id', component: WallpaperDetailsByIdComponent },
  { path: 'wallpaperById/:name/:id', component: WallpaperDetailsByIdComponent },
  { path: '*', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
