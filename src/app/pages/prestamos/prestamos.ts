import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './prestamos.html',
  styleUrls: ['./prestamos.css']
})
export class Prestamos {
  usuarios = [
    { id: 1, nombre: 'Laura Sánchez', email: 'laura@example.com' },
    { id: 2, nombre: 'Carlos Pérez', email: 'carlos@example.com' },
    { id: 3, nombre: 'Ana Gómez', email: 'ana@example.com' }
  ];

  usuarioSeleccionado: any = null;
  mostrarFormularioEditar = false;

  editNombre: string = '';
  editEmail: string = '';

  seleccionarUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
  }

  borrarUsuario() {
    if (this.usuarioSeleccionado) {
      this.usuarios = this.usuarios.filter(u => u !== this.usuarioSeleccionado);
      this.usuarioSeleccionado = null;
    }
  }

  abrirFormularioEditar() {
    if (this.usuarioSeleccionado) {
      this.editNombre = this.usuarioSeleccionado.nombre;
      this.editEmail = this.usuarioSeleccionado.email;
      this.mostrarFormularioEditar = true;
    }
  }

  guardarCambios() {
    if (this.usuarioSeleccionado) {
      this.usuarioSeleccionado.nombre = this.editNombre;
      this.usuarioSeleccionado.email = this.editEmail;
      this.mostrarFormularioEditar = false;
      this.usuarioSeleccionado = null;
    }
  }

  cancelarEdicion() {
    this.mostrarFormularioEditar = false;
    this.usuarioSeleccionado = null;
  }
}