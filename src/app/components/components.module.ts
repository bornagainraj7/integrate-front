import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { ComponentsRouterModule } from './components-router.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsRouterModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
})
export class ComponentsModule { }
