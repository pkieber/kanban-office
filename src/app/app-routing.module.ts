import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { SidenavSummaryComponent } from './pages/sidenav-summary/sidenav-summary.component';

const routes: Routes = [
  { path: '', component: MainComponent,
    children: [
      { path: 'sidenav-summary', component: SidenavSummaryComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
