import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/profiles" },
  { path: "home", component: HomeComponent },
  {
    path: 'profiles',
    loadChildren: () => import('./modules/profiles/profiles.module').then(m => m.ProfilesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
