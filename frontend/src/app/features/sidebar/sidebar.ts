import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit {
  showChatbot = false;

  ngOnInit() {
    const savedValue = localStorage.getItem('showChatbot');
    this.showChatbot = savedValue === 'true'; // only true if explicitly set
  }

  openChatbot() {
    this.showChatbot = !this.showChatbot;
    localStorage.setItem('showChatbot', this.showChatbot.toString());
  }
}
