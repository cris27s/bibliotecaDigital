import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Autor {
  id_autor: string;
  nombre: string;
  nacionalidad: string;
  descripcion: string;
}

@Injectable({
  providedIn: "root",
})
export class AutorService {
  private apiUrl = "https://apiclases.inacode.cl/biblioteca/autores";

  constructor(private http: HttpClient) {}

  // Obtener todos los autores
  obtenerAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  // Agregar un nuevo autor
  agregarAutor(autor: Omit<Autor, 'id_autor'>): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  // Actualizar un autor
  actualizarAutor(autor: Autor): Observable<Autor> {
    const payload = {
      nombre: autor.nombre,
      nacionalidad: autor.nacionalidad,
      descripcion: autor.descripcion
    };
    return this.http.put<Autor>(`${this.apiUrl}/${autor.id_autor}`, payload);
  }

  // Eliminar un autor por ID
  eliminarAutor(id_autor: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_autor}`);
  }
}