import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prestamo {
  id_prestamo: string;
  id_libro: string;
  id_usuario: string;
  fecha_prestamo: string;
  fecha_devolucion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'https://apiclases.inacode.cl/biblioteca/prestamos';

  constructor(private http: HttpClient) {}

  obtenerPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }

  actualizarPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.apiUrl}/${prestamo.id_prestamo}`, prestamo);
  }

  eliminarPrestamo(id_prestamo: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_prestamo}`);
  }

  agregarPrestamo(prestamo: Omit<Prestamo, 'id_prestamo'>): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, prestamo);
  }
}