import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { BackButtonComponent } from './components/back-button/back-button.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, BreadCrumbComponent, BackButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'plataforma_certificacion';
  mostrar = true;
  private router = inject(Router);

  constructor() {
    this.router.events.subscribe(() => {
      const excludedRoutes = ['/login', '/'];
      this.mostrar = !excludedRoutes.includes(this.router.url);
    });
  }
}
