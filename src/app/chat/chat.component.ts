import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import socketIo from 'socket.io-client';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  @ViewChild('chatboxElement')
  chatboxElement!: ElementRef;
  title = 'chat';
  endPoint = 'https://chat-app-server-vr6w.onrender.com/';
  socket: any;
  @Input() user: String = '';
  messageUser = '';
  messageText = '';
  class = '';
  displayMessages: {
    messageText: string;
    messageUser: string;
    class: string;
  }[] = [];
  ngOnInit() {
    this.socket = socketIo(this.endPoint, { transports: ['websocket'] });
    this.socket.on('connect', () => {
      const socketId = this.socket.id;
      this.socket.emit('joined', this.user);
    });

    this.socket.on('welcome', (data: { user: any; message: any }) => {
    });

    this.socket.on('userJoined', (data: { user: any; message: any }) => {
      const object = {
        messageText: data.message,
        messageUser: data.user,
        class: 'middle',
      };
      this.displayMessages.push(object);
      this.scrollToBottom();
    });

    this.socket.on('leave', (data: { user: any; message: any }) => {
      const object = {
        messageText: data.message,
        messageUser: data.user,
        class: 'middle',
      };
      this.displayMessages.push(object);
      this.scrollToBottom();
    });

    this.socket.on(
      'sendMessage',
      (data: { user: any; message: any; socketId: any }) => {
        this.messageText = data.message;
        if (this.socket.id == data.socketId) {
          this.messageUser = 'You';
          this.class = 'right';
        } else {
          this.messageUser = data.user;
          this.class = 'left';
        }

        const object = {
          messageText: this.messageText,
          messageUser: this.messageUser,
          class: this.class,
        };
        this.displayMessages.push(object);
        this.scrollToBottom();
      }
    );
  }

  message() {
    const messageText = document.getElementById(
      'chatInput'
    ) as HTMLInputElement;
    this.socket.emit('message', {
      user: this.user,
      message: messageText.value,
    });
    messageText.value = '';
  }

  scrollToBottom() {
    this.chatboxElement.nativeElement.scrollTop = this.chatboxElement?.nativeElement.scrollHeight;
  }
}
