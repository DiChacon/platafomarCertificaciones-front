import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { Registro2Component } from './pages/registro2/registro2.component';
import { ValidadorComponent } from './pages/validador/validador.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { CertificacionesPageComponent } from './pages/certificaciones-page/certificaciones-page.component';
import { GenerarCertificadoComponent } from './pages/generar-certificado/generar-certificado.component';
import { ExamenAdminComponent } from './pages/examen-admin/examen-admin.component';
import { ExamenPreguntasComponent } from './pages/ver-examen/ver-examen.component';
import { PreguntaAdminComponent } from './pages/pregunta-admin/pregunta-admin.component';
import { VerPreguntaComponent } from './pages/ver-pregunta/ver-pregunta.component';
import { EditarPreguntaComponent } from './pages/editar-pregunta/editar-pregunta.component';
import { AgregarPreguntaComponent } from './pages/agregar-pregunta/agregar-pregunta.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, data: { breadcrumb: 'Inicio' } },
    { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
    { path: 'inicio/registro', component: Registro2Component, data: { breadcrumb: 'Registro' } },
    { path: 'validador', component: ValidadorComponent, data: { breadcrumb: 'Validador' } },
    { path: 'inicio', component: InicioComponent, data: { breadcrumb: 'Inicio' } },
    { path: 'inicio/examen', component: ExamenComponent, data: { breadcrumb: 'Examen' } },
    { path: 'inicio/admin-examen', component: ExamenAdminComponent, data: { breadcrumb: 'Admin Examen' } },
    { path: 'inicio/examen/preguntas', component: PreguntasComponent, data: { breadcrumb: 'Preguntas' } },
    { path: 'inicio/certificaciones', component: CertificacionesPageComponent, data: { breadcrumb: 'Certificaciones' } },
    { path: 'generar-certificado', component: GenerarCertificadoComponent, data: { breadcrumb: 'Generar Certificado' } },
    { path: 'inicio/admin-examen/ver-examen', component: ExamenPreguntasComponent, data: { breadcrumb: 'Ver Examen' } },
    { path: 'inicio/admin-examen/admin-pregunta', component: PreguntaAdminComponent, data: { breadcrumb: 'Admin Pregunta' } },
    { path: 'inicio/admin-examen/admin-pregunta/ver-pregunta', component: VerPreguntaComponent, data: { breadcrumb: 'Ver Pregunta' } },
    { path: 'inicio/admin-examen/admin-pregunta/editar-pregunta', component: EditarPreguntaComponent, data: { breadcrumb: 'Editar Pregunta' } },
    { path: 'inicio/admin-examen/admin-pregunta/agregar-pregunta', component: AgregarPreguntaComponent, data: { breadcrumb: 'Agregar Pregunta' } },
  ];
  