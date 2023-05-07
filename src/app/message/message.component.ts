import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() user: { messageText: string, messageUser: string, class: string }[] = [];
  @Input() messageText: String = '';
  @Input() class: String = '';
}
