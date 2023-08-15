import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Bodega {

    @Expose({ name: 'id' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro id es obligatorio y debe ser un numero entero (int).`}}})
    _id: number;

    @Expose({ name: 'Nombre-Bodega' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Nombre-Bodega es obligatorio y debe ser un string` }}})
    nombre: string;

    @Expose({ name: 'Responsable-id' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Responsable-id es obligatorio y debe ser un numero entero (int).`}}})
    id_responsable: number;

    @Expose({ name: 'Estado-Bodega' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Estado-Bodega es obligatorio y debe ser un numero entero (int).`}}})
    estado: number;

    @Expose({ name: 'Creado-Por' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Creado-Por es obligatorio y debe ser un numero entero (int).`}}})
    created_by: number;

    @Expose({ name: 'Creado-Hora' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro Creado-Hora es obligatorio y debe ser un string` }}})
    created_at: string;

    constructor (data: Partial<Bodega>) {
        this._id = 0;
        this.nombre = "Faker";
        this.id_responsable = 0;
        this.estado = 0;
        this.created_by = 0;
        this.created_at = "YYYY-MM-DD"
    }
}