import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent {
  breadcrumbs: { label: string, url: string }[] = [];
  lastUrl: string | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      pairwise() // Para obtener el evento de navegación anterior y el actual
    ).subscribe(([previous, current]: [NavigationEnd, NavigationEnd]) => {
      console.log('Previous URL:', previous.urlAfterRedirects);
      console.log('Current URL:', current.urlAfterRedirects);

      // Comprobación mejorada para navegación hacia atrás
      if (this.breadcrumbs.length > 1 && previous.urlAfterRedirects.includes(current.urlAfterRedirects)) {
        // Se eliminó una navegación hacia atrás
        this.breadcrumbs.pop();
        console.log('Breadcrumbs after pop:', this.breadcrumbs);
      } else {
        // Genera y actualiza los nuevos breadcrumbs
        const newBreadcrumbs = this.createBreadcrumbs(this.activatedRoute.root, '');
        this.updateBreadcrumbs(newBreadcrumbs);
      }

      console.log('Updated breadcrumbs:', this.breadcrumbs);
      this.lastUrl = current.urlAfterRedirects;
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: { label: string, url: string }[] = []): { label: string, url: string }[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
        const label = child.snapshot.data['breadcrumb'] || this.capitalizeFirstLetter(routeURL.replace(/-/g, ' '));

        if (!breadcrumbs.some(b => b.url === url)) {
          breadcrumbs.push({ label, url });
        }
      }

      this.createBreadcrumbs(child, url, breadcrumbs);
    }

    console.log('Breadcrumbs created during traversal:', breadcrumbs);
    return breadcrumbs;
  }

  private updateBreadcrumbs(newBreadcrumbs: { label: string, url: string }[]): void {
    const currentUrls = this.breadcrumbs.map(b => b.url);
    newBreadcrumbs.forEach(breadcrumb => {
      if (!currentUrls.includes(breadcrumb.url)) {
        this.breadcrumbs.push(breadcrumb);
      }
    });
    console.log('Breadcrumbs after update:', this.breadcrumbs);
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
