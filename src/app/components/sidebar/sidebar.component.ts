import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class?: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/portal/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/portal/user/profile', title: 'Profile', icon: 'person', class: '' },
  { path: '/portal/lead/create', title: 'New Case', icon: 'post_add', class: '' },
  { path: '/portal/lead/list', title: 'All Cases', icon: 'list_alt', class: '' },
  { path: '/portal/user/contract/', title: 'Contract', icon: 'assignment', class: '' },
  // { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  // { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  // { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  // { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  userId;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.menuItems = ROUTES.filter((menuItem) => menuItem);

    this.menuItems = this.menuItems.map((menu) => {
      if (menu.title === 'Contract') {
        menu.path = `/portal/user/contract/${this.userId}`;
      }
      return menu;
    });
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  logout() {
    this.authService.logout();
  }
}
