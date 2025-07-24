import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Libros } from './pages/libros/libros';
import { Autores } from './pages/autores/autores';
import { Prestamos } from './pages/prestamos/prestamos';
import { Usuarios } from './pages/usuarios/usuarios';

export const routes: Routes = [
    {path:'',component:Login},
    {path: 'usuarios', component:Usuarios},
    {path:'autores', component:Autores},
    {path:'libros', component:Libros},
    {path:'prestamos', component:Prestamos},
];