import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat-service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddPlaceComponent } from '../add-place/add-place.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit, AfterViewInit {

  @Input() userData;
  @ViewChildren('commentDiv') commentDivs: QueryList<ElementRef>;

  value = '';
  user: any;
  place: string;
  messageText: string;
  messageArray: Array<{ user: string, message: string }> = [];
  typingArray: Array<any> = [];
  places = [];
  showTextArea: boolean;
  isTyping: boolean;
  typingUser: string;
  distinctTypingUsers: any[];
  count = 0;
  newUserJoined: any;
  newUser: boolean;

  constructor(
    private chatService: ChatService,
    public dialog: MatDialog,
  ) {
    this.chatService.userLeftPlace()
      .subscribe(data => {
        this.messageArray.push(data);
      });

    this.chatService.newMessageReceived()
      .subscribe(data => {
        console.log('Current user: ', this.userData);
        console.log('Data from user: ', data);
        // if () {}
        this.messageArray.push(data);
        // tslint:disable-next-line:forin
        this.count = this.messageArray.length;
      });

    this.chatService.newUserJoined()
      .subscribe(data => {
        this.newUserJoined = data.user;
        this.newUser = true;

        setTimeout(() => {
          this.newUser = false;
        }, 3000);
      });

    this.chatService.typing()
      .subscribe(data => {
        this.typingArray.push(data.user);
        this.distinctTypingUsers = [...new Set(this.typingArray)];
      });

    this.chatService.connectedUsers()
      .subscribe(data => console.log(data));

    this.chatService.newPlaces().subscribe(data => {
      for (const x in data.places) {
        if (this.places.indexOf(data.places[x]) === -1) {
          this.places.push(data.places[x]);
        }
      }
    });
  }

  ngOnInit() {
  }

  keypress(e) {
    this.chatService.startTyping({ chatId: this.userData.id, isTyping: true });

    const value = e.target.value;
    if (value) {
      this.isTyping = true;
    } else {
      this.isTyping = false;
    }
  }

  ngAfterViewInit() {
    this.commentDivs.changes.subscribe(() => {
      if (this.commentDivs && this.commentDivs.last) {
        this.commentDivs.last.nativeElement.focus();
      }
    });
  }

  addPlace() {
    this.openDialog();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlaceComponent, {
      width: '550px',
      data: { message: '', componentType: 'Add' }
    });

    dialogRef.componentInstance.onSubmit.subscribe(response => {
      this.chatService.addPlace({ place: response });
    });
  }

  leave() {
    this.chatService.leavePlace({ user: this.user, place: this.place });
    this.showTextArea = false;
    this.value = '';
    this.user = '';
    this.place = '';
  }

  sendMessage() {
    this.chatService.sendMessage({ user: this.userData, place: this.place, message: this.messageText });
    this.messageText = '';
  }

  selectPlace(place) {
    this.place = place;
    this.chatService.joinPlace({ user: this.userData.user.name, place });
    this.showTextArea = true;
  }
}
