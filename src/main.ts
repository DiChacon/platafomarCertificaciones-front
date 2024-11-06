import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config'; // Asegúrate de que appConfig esté exportado correctamente

// Inicializa la aplicación combinando appConfig con el proveedor provideHttpClient
bootstrapApplication(AppComponent, {
  ...appConfig, // Incluye toda la configuración de appConfig
  providers: [
    ...appConfig.providers || [], // Agrega otros proveedores de appConfig si existen
    provideHttpClient() // Incluye provideHttpClient como un proveedor
  ]
}).catch((err) => console.error(err));