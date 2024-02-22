import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { SidenavSummaryComponent } from './pages/sidenav-summary/sidenav-summary.component';
import { SidenavBoardComponent } from './pages/sidenav-board/sidenav-board.component';
import { SidenavAddtaskComponent } from './pages/sidenav-addtask/sidenav-addtask.component';
import { SidenavContactsComponent } from './pages/sidenav-contacts/sidenav-contacts.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateGuard } from './guards/auth-guard/auth-guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, canActivate: [canActivateGuard],
    children: [
      { path: 'summary', component: SidenavSummaryComponent },
      { path: 'board', component: SidenavBoardComponent },
      { path: 'tasks', component: SidenavAddtaskComponent },
      { path: 'contacts', component: SidenavContactsComponent },
      { path: '**', component: NotFoundPageComponent }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
