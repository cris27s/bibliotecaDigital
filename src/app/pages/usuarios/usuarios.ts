import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService, Usuario } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
  standalone: true
})
export class Usuarios implements OnInit {
  usuarios: (Usuario & { mostrarContrasena?: boolean })[] = [];

  nuevoUsuario: Usuario = {
    nombre: '',
    correo: '',
    contrasena: ''
  };

  mostrarContrasena = false;
  modoEdicion = false;
  idEditado: number | null = null;

  constructor(
    private usuariosService: UsuarioService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.auth.estaAutenticado()) {
      this.router.navigate(['/']);
      return;
    }
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.obtenerUsuarios().subscribe(data =>{
      this.usuarios = data.map(u => ({ ...u, mostrarContrasena: false }));
    })
  }

  guardarUsuario(): void {
    if (this.modoEdicion && this.idEditado !== null) {
      this.usuariosService.actualizarUsuario(this.idEditado, this.nuevoUsuario).subscribe(() => this.postAccion());
    } else {
      this.usuariosService.crearUsuario(this.nuevoUsuario).subscribe(() => this.postAccion());
    }
  }

  editarUsuario(usuario: Usuario): void {
    this.modoEdicion = true;
    this.idEditado = usuario.id ?? null;
    this.nuevoUsuario = { ...usuario };
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe(() => this.cargarUsuarios())
    }
  }

  toggleContrasena(usuario: Usuario & { mostrarContrasena?: boolean }): void {
    usuario.mostrarContrasena = !usuario.mostrarContrasena;
  }

  postAccion(): void {
    this.cargarUsuarios();
    this.nuevoUsuario = { nombre: '', correo: '', contrasena: '' };
    this.modoEdicion = false;
    this.idEditado = null;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}