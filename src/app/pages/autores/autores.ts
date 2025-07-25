import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutorService, Autor } from '../../services/autores.service';

@Component({
  selector: 'autores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autores.html',
  styleUrls: ['./autores.css']
})
export class Autores implements OnInit {
  mostrarModalConfirmar = false;
  mostrarModalForm = false;
  autorSeleccionado: Autor | null = null;
  autores: Autor[] = [];

  autorForm: Partial<Autor> = {
    id_autor: undefined,
    nombre: '',
    nacionalidad: '',
    descripcion: ''
  };

  modoForm: 'agregar' | 'actualizar' = 'agregar';

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(): void {
    this.autorService.obtenerAutores().subscribe({
      next: (data) => this.autores = data,
      error: (err) => console.error('Error al cargar autores:', err)
    });
  }

  abrirModalConfirmar(autor: Autor): void {
    this.autorSeleccionado = autor;
    this.mostrarModalConfirmar = true;
  }

  cerrarModalConfirmar(): void {
    this.mostrarModalConfirmar = false;
    this.autorSeleccionado = null;
  }

  confirmarBorrado(): void {
    if (this.autorSeleccionado) {
      this.autorService.eliminarAutor(this.autorSeleccionado.id_autor).subscribe({
        next: () => {
          this.autores = this.autores.filter(a => a.id_autor !== this.autorSeleccionado?.id_autor);
          this.cerrarModalConfirmar();
          this.autorSeleccionado = null;
        },
        error: (err) => console.error('Error al eliminar autor:', err)
      });
    }
  }

  onAgregar(): void {
    this.modoForm = 'agregar';
    this.autorForm = { nombre: '', nacionalidad: '', descripcion: '' };
    this.mostrarModalForm = true;
  }

  onActualizar(): void {
    if (!this.autorSeleccionado) return;
    this.modoForm = 'actualizar';
    this.autorForm = { ...this.autorSeleccionado };
    this.mostrarModalForm = true;
  }

  cerrarModalForm(): void {
    this.mostrarModalForm = false;
    this.autorForm = { nombre: '', nacionalidad: '', descripcion: '' };
    this.autorSeleccionado = null;
  }

  guardarAutor(): void {
    const { id_autor, nombre, nacionalidad, descripcion } = this.autorForm;

    if (!nombre?.trim() || !nacionalidad?.trim() || !descripcion?.trim()) {
      alert('Por favor, complete todos los campos');
      return;
    }

    if (this.modoForm === 'agregar') {
      this.autorService.agregarAutor({ nombre, nacionalidad, descripcion }).subscribe({
        next: (nuevoAutor) => {
          this.autores.push(nuevoAutor);
          this.cerrarModalForm();
        },
        error: (err) => console.error('Error al agregar autor:', err)
      });
    } else if (this.modoForm === 'actualizar' && id_autor !== undefined) {
      const autorActualizado: Autor = {
        id_autor,
        nombre,
        nacionalidad,
        descripcion
      };

      this.autorService.actualizarAutor(autorActualizado).subscribe({
        next: (res) => {
          const index = this.autores.findIndex(a => a.id_autor === res.id_autor);
          if (index !== -1) this.autores[index] = res;
          this.cerrarModalForm();
        },
        error: (err) => console.error('Error al actualizar autor:', err)
      });
    }
  }
}
