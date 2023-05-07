import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  chat: boolean = false;
  userName: String = '';
  error: boolean = false;
  chatRedirect() {
    const name = document.getElementById('name') as HTMLInputElement;
    this.userName = name.value;
    if (this.userName.length == 0) {
      this.chat = false;
      this.error = true;
    } else {
      this.error = false;
      this.chat = true;
    }
  }
}
