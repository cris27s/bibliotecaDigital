import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'autores',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './autores.html',
  styleUrls: ['./autores.css'] 
})
export class Autores {
  mostrarModalConfirmar: boolean = false;
  mostrarModalForm: boolean = false;

  autorSeleccionado: any = null;

  autores = [
    {
      nombre: 'Gabriel García Márquez',
      nacionalidad: 'Colombiana',
      descripcion: 'Maestro del realismo mágico. Autor de: "Cien años de soledad" y "El amor en los tiempos del cólera".'
    },
    {
      nombre: 'Isabel Allende',
      nacionalidad: 'Chilena',
      descripcion: 'Su obra entrelaza historia y emoción. Reconocida por La casa de los espíritus.'
    },
    {
      nombre: 'Mario Vargas Llosa',
      nacionalidad: 'Peruana',
      descripcion: 'Premio Nobel. Profundo explorador de la política y la literatura en obras como La ciudad y los perros.'
    },
    {
      nombre: 'Julio Cortázar',
      nacionalidad: 'Argentina',
      descripcion: 'Vanguardista y lúdico, autor de Rayuela y relatos inolvidables como La casa tomada.'
    },
    {
      nombre: 'Roberto Bolaño',
      nacionalidad: 'Chilena',
      descripcion: 'Su literatura es intensa y profunda. Reconocido por 2666 y Los detectives salvajes.'
    }
  ];

  // Formulario para añadir/actualizar
  autorForm = {
    nombre: '',
    nacionalidad: '',
    descripcion: ''
  };

  modoForm: 'agregar' | 'actualizar' = 'agregar';

  abrirModalConfirmar(autor: any) {
    this.autorSeleccionado = autor;
    this.mostrarModalConfirmar = true;
  }

  cerrarModalConfirmar() {
    this.mostrarModalConfirmar = false;
    this.autorSeleccionado = null;
  }

  confirmarBorrado() {
    if (this.autorSeleccionado) {
      this.autores = this.autores.filter(autor => autor !== this.autorSeleccionado);
    }
    this.cerrarModalConfirmar();
    this.autorSeleccionado = null;
  }

  onAgregar() {
    this.modoForm = 'agregar';
    this.autorForm = { nombre: '', nacionalidad: '', descripcion: '' };
    this.mostrarModalForm = true;
  }

  onActualizar() {
    if (!this.autorSeleccionado) return;
    this.modoForm = 'actualizar';
    this.autorForm = { ...this.autorSeleccionado };
    this.mostrarModalForm = true;
  }

  cerrarModalForm() {
    this.mostrarModalForm = false;
    this.autorForm = { nombre: '', nacionalidad: '', descripcion: '' };
  }

  guardarAutor() {
    if (
      this.autorForm.nombre.trim() === '' ||
      this.autorForm.nacionalidad.trim() === '' ||
      this.autorForm.descripcion.trim() === ''
    ) {
      alert('Por favor, complete todos los campos');
      return;
    }

    if (this.modoForm === 'agregar') {
      this.autores.push({ ...this.autorForm });
    } else if (this.modoForm === 'actualizar' && this.autorSeleccionado) {
      this.autorSeleccionado.nombre = this.autorForm.nombre;
      this.autorSeleccionado.nacionalidad = this.autorForm.nacionalidad;
      this.autorSeleccionado.descripcion = this.autorForm.descripcion;
    }

    this.cerrarModalForm();
  }
}