import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './MaterialModule';
import { ChatComponent } from './components/chat/chat.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LoginComponent } from './components/login/login.component';
import { CoordinatorComponent } from './components/coordinator/coordinator.component';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { MatDialog } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    CoordinatorComponent,
    AddPlaceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    AngularFontAwesomeModule

  ],
  providers: [MatDialog],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPlaceComponent
  ],
})
export class AppModule { }
