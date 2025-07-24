import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  contrasena: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://apiclases.inacode.cl/biblioteca/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(arr =>
        arr.map(item => ({
          id:       item.id,
          nombre:   item.nombre,
          correo:   item.correo,
          tipo:     item.tipo,
          contrasena: item.contraseña 
        }))
      )
    );
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    const payload = {
      nombre:     usuario.nombre,
      correo:     usuario.correo,
      contraseña: usuario.contrasena 
    };
    console.log('Payload a enviar:', payload);
    return this.http.post(this.apiUrl, payload);
  }


actualizarUsuario(id: number, usuario: Usuario): Observable<any> {
  const payload = {
    nombre:     usuario.nombre,
    correo:     usuario.correo,
    contraseña: usuario.contrasena
  };
  console.log('Payload de actualización:', payload);
  return this.http.put(`${this.apiUrl}/${id}`, payload);
}

  eliminarUsuario(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}