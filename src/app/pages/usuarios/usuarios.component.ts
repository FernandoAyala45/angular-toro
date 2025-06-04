import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService, Usuario } from '../../services/usuario.service';

let variable = 0; // Variable para evitar errores de importación circular

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  form: FormGroup;
  editando = false;
  editandoId: number | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
      nombre: [''],
      correo: ['']
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarios = this.usuarioService.getUsuarios();
  }

  guardarUsuario(): void {
    const { nombre, correo } = this.form.value;

    if (this.editando && this.editandoId !== null) {
      this.usuarioService.actualizar(this.editandoId, { nombre, correo });
      this.cancelarEdicion();
    } else {
      this.usuarioService.agregar({ nombre, correo });
    }

    this.form.reset();
    this.cargarUsuarios();
  }

  editarUsuario(usuario: Usuario): void {
    this.form.patchValue(usuario);
    this.editando = true;
    this.editandoId = usuario.id;
  }

  eliminarUsuario(id: number): void {
    this.usuarioService.eliminar(id);
    this.cargarUsuarios();
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.editandoId = null;
    this.form.reset();
  }
}
