import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  nombreUsuario: string | null = '';
  institucionUsuario: string | null = '';

  constructor(private router: Router) {
    // Carga los datos de nombre de usuario e institución del local storage
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    this.institucionUsuario = localStorage.getItem('institucionUsuario');
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
