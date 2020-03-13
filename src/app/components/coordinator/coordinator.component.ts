import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service';
import { ChatService } from 'src/app/services/chat-service';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss']
})
export class CoordinatorComponent implements OnInit {

  pageId = 0;
  userData: any;

  constructor(
    private loginService: LoginService,
    private chatService: ChatService
  ) {
    this.loginService.value$.subscribe(data => {
      if (data) {
      this.pageId = data.pageId;
      }
    });

    this.chatService.user$.subscribe(data => {
      this.userData = data;
    });
  }

  ngOnInit() {
  }

}
