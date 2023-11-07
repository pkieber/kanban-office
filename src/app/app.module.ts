import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// Material components
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Drag-and-drop implementation
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase components
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { MainComponent } from './layout/main/main.component';
import { HelpComponent } from './components/help/help.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidenavSummaryComponent } from './pages/sidenav-summary/sidenav-summary.component';
import { SidenavBoardComponent } from './pages/sidenav-board/sidenav-board.component';
import { SidenavAddtaskComponent } from './pages/sidenav-addtask/sidenav-addtask.component';
import { SidenavContactsComponent } from './pages/sidenav-contacts/sidenav-contacts.component';
import { SidenavLegalComponent } from './pages/sidenav-legal/sidenav-legal.component';
import { BoardDialogComponent } from './pages/sidenav-board/board-dialog/board-dialog.component';
import { BoardTaskComponent } from './pages/sidenav-board/board-task/board-task.component';
import { ContactListComponent } from './pages/sidenav-contacts/contact-list/contact-list.component';
import { ContactCardComponent } from './pages/sidenav-contacts/contact-card/contact-card.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HelpComponent,
    ImprintComponent,
    ProfileComponent,
    SidenavSummaryComponent,
    SidenavBoardComponent,
    SidenavAddtaskComponent,
    SidenavContactsComponent,
    SidenavLegalComponent,
    BoardDialogComponent,
    BoardTaskComponent,
    ContactListComponent,
    ContactCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Firebase components
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // Material components
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatRadioModule,
    FormsModule, ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatSnackBarModule,
    // Drag-and-drop implementation
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
