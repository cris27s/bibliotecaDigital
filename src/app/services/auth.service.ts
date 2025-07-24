import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly clave = 'logueado';

  login(usuario: string, contrasena: string): boolean {
    if (usuario === 'admin' && contrasena === '1234') {
      localStorage.setItem(this.clave, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.clave);
  }

  estaAutenticado(): boolean {
    return localStorage.getItem(this.clave) === 'true';
  }
}