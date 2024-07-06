import React from 'react';

import FText from '../widgets/FText';
import FSelect from '../widgets/FSelect';
import FModal from '../widgets/FModal';
import FTable from '../widgets/FTable';
import FForm from '../widgets/FForm';

import axiosInstance from '../interceptors/axiosConfig';

class GuiaDevolucion extends FModal {
    constructor(props) {
        super(props, {
            state: {
                show: false,
                item: {
                    id: 0,
                    numero: '',
                    fecha: '',
                    estado_pieza_id: '',
                },
                clone: {
                    item: {
                        id: 0,
                        numero: '',
                        fecha: '',
                        estado_pieza_id: '',
                    }
                },
                select: {
                    estado: [],
                },
                parametro: {
                    estado: { search: '', size: 3000 },
                },
                basetUri: '/guia_devolucion',
                endUri: '/index',
                titulo: ['Guia de devolucion']
            }
        });

        this.select();
    }

    select() {
        axiosInstance.post(this.state.basetUri + '/select', this.state.parametro).then((response) => {
            this.setState({
                select: {
                    estado: response.data.estado.data.data,
                },
            });
            console.log(response.data);
        })
            .catch((error) => {
                console.error('error:', error);
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
                        numero: { name: 'Numero de orden' },
                        fecha: { name: 'Fecha' },
                        estado_pieza: { name: 'Estado de pieza',object:['descripcion'] },
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
                        label='Guia de rojo'
                        type='text'
                        value={item.numero}
                        name='numero'
                        onChange={this.changed}
                        placeholder='guia de rojo'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.numero}
                    />
                    <FText
                        label='Fecha'
                        type='date'
                        value={item.fecha}
                        name='fecha'
                        onChange={this.changed}
                        placeholder='fecha'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.fecha}
                    />

                    <FSelect
                        label={'Estado de pieza'}//titulo
                        name={'estado_pieza_id'}
                        value={item.estado_pieza_id}
                        colum={['id', 'descripcion']}//columna
                        onChange={this.changed}
                        validate={resquest?.estado_pieza_id}
                        disabled={modal.disabled}
                        select={select.estado}
                    />
                </FForm>
            </>
        );
    }

}

export default GuiaDevolucion;