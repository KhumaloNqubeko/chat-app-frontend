import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat-service';
import { LoginService } from './services/login-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ChatService, LoginService]
})
export class AppComponent {
}
