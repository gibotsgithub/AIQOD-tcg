import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-top-navbar',
  imports: [NgIf, CommonModule],
  standalone: true,
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.css',
})
export class TopNavbar {
  @Input() showModelDropdown = true;
  showProfileMenu = false;
  @ViewChild('modelSelect') modelSelect!: ElementRef<HTMLSelectElement>;
  
  role: string | null = null;
  rmList: string[] = [];

  constructor(private router: Router, private http: HttpClient) {}

ngOnInit() {
  this.role = localStorage.getItem('role');
  this.http.get<any[]>('https://tcg-node.onrender.com/api/users/getRms')
    .subscribe({
      next: (data) => {
        // Map to just the user_name field
        this.rmList = data.map(rm => rm.user_name);
        console.log('RM Names:', this.rmList);
      },
      error: (err) => {
        console.error('Failed to fetch RM list:', err);
        this.rmList = [];
      }
    });
}


  // fixed dropdown
  handlePolicyRoute(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);

    if (selectedValue === 'mas-policy-watch') {
      console.log('Navigating to MAS Policy Watch');
      this.router.navigate(['/mas-policy-watch']);
    }

    this.modelSelect.nativeElement.value = '';
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    // Optionally clear any in-memory state here
    this.router.navigate(['/login']);
  }
}
