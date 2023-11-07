import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { SidenavSummaryComponent } from './pages/sidenav-summary/sidenav-summary.component';
import { SidenavBoardComponent } from './pages/sidenav-board/sidenav-board.component';
import { SidenavAddtaskComponent } from './pages/sidenav-addtask/sidenav-addtask.component';
import { SidenavContactsComponent } from './pages/sidenav-contacts/sidenav-contacts.component';

const routes: Routes = [
  { path: '', component: MainComponent,
    children: [
      { path: 'summary', component: SidenavSummaryComponent },
      { path: 'board', component: SidenavBoardComponent },
      { path: 'addtask', component: SidenavAddtaskComponent },
      { path: 'contacts', component: SidenavContactsComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
