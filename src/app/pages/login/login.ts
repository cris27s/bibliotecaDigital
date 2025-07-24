import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  usuario= '';
  contrasena = '';
  error= false;

  constructor(private auth: AuthService, private router: Router) {}

  ingresar(): void {
    console.log('Metodo ingresar llamado');
    if (this.auth.login(this.usuario, this.contrasena)) {
      this.router.navigate(['/usuarios']);
    } else {
      this.error = true;
    }
  }
}