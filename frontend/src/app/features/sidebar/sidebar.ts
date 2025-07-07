import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  showChatbot = false;

  openChatbot() {
    this.showChatbot = true;
    localStorage.setItem('showChatbot', 'true');
  }
}
