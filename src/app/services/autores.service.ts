// src/app/services/autores.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Autor {
  id_autor: number;
  nombre: string;
  nacionalidad: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private apiUrl = 'https://apiclases.inacode.cl/biblioteca/autores';

  constructor(private http: HttpClient) {}

  obtenerAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  agregarAutor(autor: Partial<Autor>): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  actualizarAutor(autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.apiUrl}/${autor.id_autor}`, autor);
  }

  eliminarAutor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
