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
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
import { ContactDialogComponent } from './pages/sidenav-contacts/contact-dialog/contact-dialog.component';
import { AlphabeticalSortPipe } from './alphabetical-sort.pipe';
import { SearchComponent } from './components/search/search.component';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { CustomeMobilenavComponent } from './components/custom-mobilenav/custom-mobilenav.component';
import { BoardTaskDialogComponent } from './pages/sidenav-board/board-task-dialog/board-task-dialog.component';
import { AddtaskFormComponent } from './pages/sidenav-addtask/addtask-form/addtask-form.component';
import { AddContactFormComponent } from './pages/sidenav-contacts/add-contact-form/add-contact-form.component';
import { ContactEditComponent } from './pages/sidenav-contacts/contact-edit/contact-edit.component';

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
    ContactCardComponent,
    ContactDialogComponent,
    AlphabeticalSortPipe,
    SearchComponent,
    CustomSidenavComponent,
    CustomeMobilenavComponent,
    BoardTaskDialogComponent,
    AddtaskFormComponent,
    AddContactFormComponent,
    ContactEditComponent,
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
    MatTableModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatListModule,
    MatSlideToggleModule,
    // Drag-and-drop implementation
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
