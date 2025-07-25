import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibrosService, Libro } from '../../services/libros.service';
import { AutorService, Autor } from '../../services/autores.service';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libros.html',
  styleUrls: ['./libros.css']
})
export class Libros implements OnInit {
  libros: Libro[] = [];
  autores: Autor[] = [];

  libroSeleccionado: Libro | null = null;
  mostrarModalForm = false;
  mostrarModalConfirmar = false;
  modoForm: 'agregar' | 'actualizar' = 'agregar';

  libroForm: Partial<Libro> = {
    titulo: '',
    id_autor: undefined
  };

  constructor(
    private librosService: LibrosService,
    private autorService: AutorService
  ) {}

  ngOnInit(): void {
    this.cargarLibros();
    this.cargarAutores();
  }

  cargarLibros(): void {
    this.librosService.obtenerLibros().subscribe({
      next: (data) => this.libros = data,
      error: (err) => console.error('Error al cargar libros:', err)
    });
  }

  cargarAutores(): void {
    this.autorService.obtenerAutores().subscribe({
      next: (data) => this.autores = data,
      error: (err) => console.error('Error al cargar autores:', err)
    });
  }

  onAgregar(): void {
    this.modoForm = 'agregar';
    this.libroForm = { titulo: '', id_autor: undefined };
    this.mostrarModalForm = true;
  }

  onActualizar(): void {
    if (!this.libroSeleccionado) return;
    this.modoForm = 'actualizar';
    this.libroForm = {
      titulo: this.libroSeleccionado.titulo,
      id_autor: this.libroSeleccionado.id_autor
    };
    this.mostrarModalForm = true;
  }

  cerrarModalForm(): void {
    this.mostrarModalForm = false;
    this.libroForm = { titulo: '', id_autor: undefined };
  }

  guardarLibro(): void {
    const libroData = this.libroForm;

    if (!libroData.titulo || !libroData.id_autor) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (this.modoForm === 'agregar') {
      this.librosService.agregarLibro(libroData as Libro).subscribe({
        next: (nuevoLibro) => {
          this.libros.push(nuevoLibro);
          this.cerrarModalForm();
        },
        error: (err) => console.error('Error al agregar libro:', err)
      });
    } else if (this.modoForm === 'actualizar' && this.libroSeleccionado) {
      const actualizado: Libro = {
        ...this.libroSeleccionado,
        titulo: libroData.titulo,
        id_autor: libroData.id_autor
      };

      this.librosService.actualizarLibro(actualizado).subscribe({
        next: () => {
          const index = this.libros.findIndex(l => l.id_libro === actualizado.id_libro);
          if (index !== -1) this.libros[index] = actualizado;
          this.cerrarModalForm();
          this.libroSeleccionado = null;
        },
        error: (err) => console.error('Error al actualizar libro:', err)
      });
    }
  }

  abrirModalConfirmar(libro: Libro): void {
    this.libroSeleccionado = libro;
    this.mostrarModalConfirmar = true;
  }

  cerrarModalConfirmar(): void {
    this.mostrarModalConfirmar = false;
    this.libroSeleccionado = null;
  }

  confirmarBorrado(): void {
    if (!this.libroSeleccionado) return;

    this.librosService.eliminarLibro(this.libroSeleccionado.id_libro).subscribe({
      next: () => {
        this.libros = this.libros.filter(l => l.id_libro !== this.libroSeleccionado?.id_autor);
        this.cerrarModalConfirmar();
      },
      error: (err) => console.error('Error al eliminar libro:', err)
    });
  }
}