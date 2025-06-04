import { Injectable } from '@angular/core';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private nextId = 1;

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  agregar(usuario: Omit<Usuario, 'id'>): void {
    const nuevo: Usuario = { id: this.nextId++, ...usuario };
    this.usuarios.push(nuevo);
  }

  actualizar(id: number, datos: Partial<Usuario>): void {
    const usuario = this.usuarios.find(u => u.id === id);
    if (usuario) {
      Object.assign(usuario, datos);
    }
  }

  eliminar(id: number): void {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
  }
}
