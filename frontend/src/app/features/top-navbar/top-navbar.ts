import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-top-navbar',
  imports: [NgIf, CommonModule],
  standalone: true,
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.css',
})
export class TopNavbar implements OnInit {
  @Input() showModelDropdown = true;
  showProfileMenu = false;
  @ViewChild('modelSelect') modelSelect!: ElementRef<HTMLSelectElement>;

  role: string | null = null;
  rmList: any[] = [];
  manager = localStorage.getItem('user_name');

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.http
      .get<any[]>('https://tcg-node.onrender.com/api/users/getRms')
      .subscribe({
        next: (data) => {
          this.rmList = data;
          console.log('RM Names:', this.rmList);
        },
        error: (err) => {
          console.error('Failed to fetch RM list:', err);
          this.rmList = [];
        },
      });

    // Route-based model dropdown logic
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     let path = event.urlAfterRedirects || event.url;
    //     path = path.split('?')[0].replace(/\/$/, '');
    //     this.showModelDropdown = !(
    //       path.startsWith('/mas-policy-watch') ||
    //       path.startsWith('/analysis-results') ||
    //       path.startsWith('/mas-history') ||
    //       path.startsWith('/dashboard')
    //     );
    //   });
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

  returnToManager() {
    localStorage.setItem('role', 'Manager');
    const Impersonator = localStorage.getItem('Impersonator');
    localStorage.setItem('user_name', Impersonator || '');
    localStorage.setItem('isImpersonating', 'false');
    this.router.navigate(['/dashboard']);
  }
  get isImpersonating(): boolean {
    return localStorage.getItem('isImpersonating') === 'true';
  }
  onRmClick(userName: string) {
    const manager = localStorage.getItem('user_name');
    localStorage.setItem('Impersonator', manager || '');
    console.log('Clicked RM:', userName);
    localStorage.setItem('user_name', userName);
    localStorage.setItem('role', 'RM');
    localStorage.setItem('isImpersonating', 'true');
    window.location.reload();
  }
}
