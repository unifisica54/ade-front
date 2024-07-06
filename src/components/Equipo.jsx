import React from 'react';

import FText from '../widgets/FText';
import FSelect from '../widgets/FSelect';
import FModal from '../widgets/FModal';
import FTable from '../widgets/FTable';
import FForm from '../widgets/FForm';

import axiosInstance from '../interceptors/axiosConfig';

class Equipo extends FModal {
    constructor(props) {
        super(props, {
            state: {
                item: {
                    id: 0,
                    nombre: '',
                    tipo: '',
                    marca: '',
                    modelo: '',
                    generacion: '',
                    numero_serie: '',
                },
                clone: {
                    item: {
                        id: 0,
                        nombre: '',
                        tipo: '',
                        marca: '',
                        modelo: '',
                        generacion: '',
                        numero_serie: '',
                    }
                },
                select: {
                    tipo_equipo: []
                },
                parametro: {
                    tipo_equipo: { search: '', size: 2000 },
                },
                basetUri: '/equipo',
                endUri: '/index',
                titulo: ['Equipo']
            }
        });

        setTimeout(() => {
            this.select();
        }, 200);
    }

    select() {
        
        this.setState({
            select: {
                tipo_equipo: [
                    { id: 1, descripcion: 'Computadora de escritorio' },
                    { id: 2, descripcion: 'Laptop' },
                    { id: 3, descripcion: 'Servidor' },
                    { id: 4, descripcion: 'Tablet' },
                    { id: 5, descripcion: 'Smartphone' },
                    { id: 6, descripcion: 'Impresora' },
                    { id: 7, descripcion: 'Escáner' },
                    { id: 8, descripcion: 'Router' },
                    { id: 9, descripcion: 'Switch' },
                    { id: 10, descripcion: 'Disco duro externo' },
                    { id: 11, descripcion: 'Unidad de estado sólido (SSD)' },
                    { id: 12, descripcion: 'Monitor' },
                    { id: 13, descripcion: 'Teclado' },
                    { id: 14, descripcion: 'Ratón' },
                    { id: 15, descripcion: 'Proyector' },
                    { id: 16, descripcion: 'Cámara web' },
                    { id: 17, descripcion: 'Micrófono' },
                    { id: 18, descripcion: 'Altavoces' },
                    { id: 19, descripcion: 'Sistema de videoconferencia' },
                    { id: 20, descripcion: 'Cámara de seguridad' }
                ]
            },
        });

    }
    render() {

        const { clone, titulo } = this.state;
        const { item, modal, select, btn, modal_event, load, resquest } = this.state;
        const { basetUri, endUri } = this.state;

        return (
            <>
                <FTable
                    basetUri={basetUri}
                    endUri={endUri}
                    load={load}
                    event={['add', 'edit', 'delete', 'show']}
                    event_name={(name, id) => this.event(name, id)}
                    titulo={titulo}
                    columns={{
                        nombre: { name: 'Nombre' },
                        marca: { name: 'Marca' },
                        modelo: { name: 'Modelo' },
                        generacion: { name: 'Generacion' },
                    }}
                    onLoadClose={this.loadClose}
                />
                <FForm
                    btn={btn}
                    modal_event={modal_event}
                    onModalClose={this.handleModalClose}
                    onCreate={this.save}
                >
                    <FText
                        label='Nombre'
                        type='text'
                        value={item.nombre}
                        name='nombre'
                        onChange={this.changed}
                        placeholder='Nombre'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.nombre}
                    />

                    <FSelect
                        label={'Tipo Equipo'}//titulo
                        name={'tipo'}
                        value={item.tipo}
                        colum={['id', 'descripcion']}//columna
                        onChange={this.changed}
                        validate={resquest?.tipo}
                        disabled={modal.disabled}
                        select={select.tipo_equipo}
                    />

                    <FText
                        label='Marca'
                        type='text'
                        value={item.marca}
                        name='marca'
                        onChange={this.changed}
                        placeholder='marca'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.marca}
                    />

                    <FText
                        label='Modelo'
                        type='text'
                        value={item.modelo}
                        name='modelo'
                        onChange={this.changed}
                        placeholder='modelo'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.modelo}
                    />
                    <FText
                        label='Generacion'
                        type='text'
                        value={item.generacion}
                        name='generacion'
                        onChange={this.changed}
                        placeholder='generacion'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.generacion}
                    />

                    <FText
                        label='Numero de serie'
                        type='text'
                        value={item.numero_serie}
                        name='numero_serie'
                        onChange={this.changed}
                        placeholder='numero de serie'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.numero_serie}
                    />

                </FForm>
            </>
        );
    }

}

export default Equipo;