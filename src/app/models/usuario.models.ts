export interface Usuario {
    id_usuario: number;
    nombre:     string;
    correo:     string;
    estado:     number;
}

export interface Categoria {
    id_categoria :number,
    id_usuario :number,
    nombre: string,
    correo: string,
    estado: number
}

export interface Producto {
    id_producto :number,
    id_usuario :number,
    id_categoria :number,
    nombre: string,
    precio: number,
    descripcion:string
    estado: number
}

