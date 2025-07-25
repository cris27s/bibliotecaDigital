import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../../services/prestamos.service';

export interface Prestamo {
  id_prestamo: string;
  id_libro: string;
  id_usuario: string;
  fecha_prestamo: string;
  fecha_devolucion: string;
  estado: string;
}

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamos.html',
  styleUrls: ['./prestamos.css']
})
export class Prestamos implements OnInit {
  prestamos: Prestamo[] = [];
  prestamoSeleccionado: Prestamo | null = null;

  mostrarFormularioEditar = false;
  mostrarFormularioNuevo = false;

  editFechaPrestamo = '';
  editFechaDevolucion = '';
  editEstado = '';

  nuevoPrestamo: Omit<Prestamo, 'id_prestamo'> = {
    id_libro: '',
    id_usuario: '',
    fecha_prestamo: '',
    fecha_devolucion: '',
    estado: 'activo'
  };

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos(): void {
    this.prestamoService.obtenerPrestamos().subscribe({
      next: (data) => this.prestamos = data,
      error: (err) => console.error('Error al cargar préstamos:', err)
    });
  }

  seleccionarPrestamo(prestamo: Prestamo): void {
    this.prestamoSeleccionado = prestamo;
  }

  abrirFormularioEditar(): void {
    if (this.prestamoSeleccionado) {
      this.editFechaPrestamo = this.prestamoSeleccionado.fecha_prestamo;
      this.editFechaDevolucion = this.prestamoSeleccionado.fecha_devolucion;
      this.editEstado = this.prestamoSeleccionado.estado;
      this.mostrarFormularioEditar = true;
    }
  }

  guardarCambios(): void {
    if (!this.prestamoSeleccionado) return;

    const actualizado: Prestamo = {
      ...this.prestamoSeleccionado,
      fecha_prestamo: this.editFechaPrestamo,
      fecha_devolucion: this.editFechaDevolucion,
      estado: this.editEstado
    };

    this.prestamoService.actualizarPrestamo(actualizado).subscribe({
      next: () => {
        const index = this.prestamos.findIndex(p => p.id_prestamo === actualizado.id_prestamo);
        if (index > -1) this.prestamos[index] = actualizado;
        this.mostrarFormularioEditar = false;
        this.prestamoSeleccionado = null;
      },
      error: (err) => console.error('Error al actualizar préstamo:', err)
    });
  }

  borrarPrestamo(): void {
    if (!this.prestamoSeleccionado) return;

    this.prestamoService.eliminarPrestamo(this.prestamoSeleccionado.id_prestamo).subscribe({
      next: () => {
        this.prestamos = this.prestamos.filter(p => p.id_prestamo !== this.prestamoSeleccionado?.id_prestamo);
        this.prestamoSeleccionado = null;
      },
      error: (err) => console.error('Error al eliminar préstamo:', err)
    });
  }

  cancelarEdicion(): void {
    this.mostrarFormularioEditar = false;
    this.prestamoSeleccionado = null;
  }

  abrirFormularioNuevo(): void {
    this.nuevoPrestamo = {
      id_libro: '',
      id_usuario: '',
      fecha_prestamo: '',
      fecha_devolucion: '',
      estado: 'activo'
    };
    this.mostrarFormularioNuevo = true;
  }

  guardarNuevoPrestamo(): void {
    const { id_libro, id_usuario, fecha_prestamo, fecha_devolucion, estado } = this.nuevoPrestamo;

    if (!id_libro || !id_usuario || !fecha_prestamo || !fecha_devolucion || !estado) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    this.prestamoService.agregarPrestamo(this.nuevoPrestamo).subscribe({
      next: (nuevo) => {
        this.prestamos.push(nuevo);
        this.mostrarFormularioNuevo = false;
      },
      error: (err) => {
        console.error('Error al añadir préstamo:', err);
      }
    });
  }

  cancelarNuevoPrestamo(): void {
    this.mostrarFormularioNuevo = false;
  }
}