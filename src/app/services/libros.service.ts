import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro {
  id_libro: number;
  titulo: string;
  id_autor: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private apiUrl = 'https://apiclases.inacode.cl/biblioteca/libros';

  constructor(private http: HttpClient) {}

  obtenerLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  agregarLibro(libro: Partial<Libro>): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  actualizarLibro(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${libro.id_libro}`, libro);
  }

  eliminarLibro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}