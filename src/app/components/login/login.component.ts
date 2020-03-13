import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ChatService } from 'src/app/services/chat-service';
import { LoginService } from 'src/app/services/login-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: string;
  private place: string;
  private userExists = false;

  constructor(
    private snackBar: MatSnackBar,
    private chatService: ChatService,
    private loginService: LoginService
  ) {
    this.chatService.connectedUsers()
      .subscribe(data => {
        this.chatService.emitUser(data);
        this.userExists = data.isUser;
        if (!this.userExists) {
          this.loginService.emitValue({pageId: 1});
        }
      });
  }

  ngOnInit() {
  }

  join() {
    if (this.user) {
      this.chatService.connectUser({ name: this.user });
    } else {
      this.openSnackBar(`What's your nickname?`, '');
    }
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
