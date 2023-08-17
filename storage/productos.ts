import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';
export class Producto {

    @Expose({ name: 'Nombre-Producto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El Nombre-Producto es obligatoria`}}})
    nombre: string;

    @Expose({ name: 'Descripcion-Producto' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    descripcion: string;

    @Expose({ name: 'Estado-Producto' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `La estado es obligatoria`}}})
    estado: number;

    @Expose({ name: 'Creado-Por' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `La Creado-Por es obligatoria`}}})
    created_by: number;

    @Expose({ name: 'Actualizado-Por' })
    @Transform(({ value }) => { if(value) return value ; else 0})
    update_by: number;

    @Expose({ name: 'Creado-Hora' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    created_at: string;

    @Expose({ name: 'Actualizado-Hora' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    updated_at: string;

    @Expose({ name: 'Eliminado-Hora' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    deleted_at: string;

    constructor(data:Partial<Producto>) {
        Object.assign(this, data);
        this.nombre = "Faker";
        this.estado = 0;
        this.created_by = 0;
    }
}