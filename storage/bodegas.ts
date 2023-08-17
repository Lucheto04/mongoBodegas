import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';
export class Bodega {

    @Expose({ name: '_id' })
    @Transform(({ value }) => { if(value) return value ; else 0})
    _id: number;

    @Expose({ name: 'Nombre-Bodega' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El Nombre-Bodega es obligatorio y debe ser un string.`}}})
    nombre: string;

    @Expose({ name: 'Responsable-id' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El Responsable-id es obligatorio y debe ser un numero entero (int).`}}})
    id_responsable: number;

    @Expose({ name: 'Estado-Bodega' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El Estado-Bodega es obligatorio y debe ser un numero entero (int).`}}})
    estado: number;

    @Expose({ name: 'created_by' })
    @Transform(({ value }) => { if(value) return value ; else 0})
    created_by: number;

    @Expose({ name: 'update_by' })
    @Transform(({ value }) => { if(value) return value ; else 0})
    update_by: number;

    @Expose({ name: 'created_at' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    created_at: string;

    @Expose({ name: 'updated_at' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    updated_at: string;

    @Expose({ name: 'deleted_at' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    deleted_at: string;

    constructor(data:Partial<Bodega>) {
        Object.assign(this, data);
        this.nombre = "Faker";
        this.id_responsable = 0;
        this.estado = 0;
    }
}