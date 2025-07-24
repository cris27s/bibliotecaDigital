import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar para ngModel

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './libros.html',
  styleUrls: ['./libros.css']
})
export class Libros {
  mostrarModalConfirmar: boolean = false;
  mostrarModalForm: boolean = false;

  libroSeleccionado: any = null;

  libros = [
    { titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez' },
    { titulo: 'La Casa de los Espíritus', autor: 'Isabel Allende' },
    { titulo: 'Los Detectives Salvajes', autor: 'Roberto Bolaño' },
    { titulo: 'Rayuela', autor: 'Julio Cortázar' },
    { titulo: 'La Ciudad y los Perros', autor: 'Mario Vargas Llosa' }
  ];

  libroForm = {
    titulo: '',
    autor: ''
  };

  modoForm: 'agregar' | 'actualizar' = 'agregar';

  abrirModalConfirmar(libro: any) {
    this.libroSeleccionado = libro;
    this.mostrarModalConfirmar = true;
  }

  cerrarModalConfirmar() {
    this.mostrarModalConfirmar = false;
    this.libroSeleccionado = null;
  }

  confirmarBorrado() {
    if (this.libroSeleccionado) {
      this.libros = this.libros.filter(libro => libro !== this.libroSeleccionado);
    }
    this.cerrarModalConfirmar();
    this.libroSeleccionado = null;
  }

  onAgregar() {
    this.modoForm = 'agregar';
    this.libroForm = { titulo: '', autor: '' };
    this.mostrarModalForm = true;
  }


  onActualizar() {
    if (!this.libroSeleccionado) return;
    this.modoForm = 'actualizar';
    this.libroForm = { ...this.libroSeleccionado }; 
    this.mostrarModalForm = true;
  }

  cerrarModalForm() {
    this.mostrarModalForm = false;
    this.libroForm = { titulo: '', autor: '' };
  }

  guardarLibro() {
    if (this.libroForm.titulo.trim() === '' || this.libroForm.autor.trim() === '') {
      alert('Por favor, complete ambos campos');
      return;
    }

    if (this.modoForm === 'agregar') {
      this.libros.push({ ...this.libroForm });
    } else if (this.modoForm === 'actualizar' && this.libroSeleccionado) {
      this.libroSeleccionado.titulo = this.libroForm.titulo;
      this.libroSeleccionado.autor = this.libroForm.autor;
    }

    this.cerrarModalForm();
  }
}