import React from 'react';
import FSelect from '../widgets/FSelect';
import FSelectAjax from '../widgets/FSelectAjax';
import FText from '../widgets/FText';
import FModal from '../widgets/FModal';
import FTable from '../widgets/FTable';
import FForm from '../widgets/FForm';

import axiosInstance from '../interceptors/axiosConfig';

class Casos extends FModal {
    constructor(props) {
        super(props, {
            state: {
                item: {
                    id: 0,
                    numero: '',
                    tarea: '',
                    fecha: '',
                    hora: '',
                    acciones_id: null,
                    equipos_id: null,
                    clientes_id: null,
                    estado_id: '',
                    precio_movilidad_ida: '',
                    precio_movilidad_vuelta: '',
                },
                accion: {},
                equipo: {},
                cliente:{},
                clone: {
                    item: {
                        id: 0,
                        numero: '',
                        tarea: '',
                        fecha: '',
                        hora: '',
                        acciones_id: null,
                        equipos_id: null,
                        clientes_id: null,
                        estado_id: '',
                        precio_movilidad_ida: '',
                        precio_movilidad_vuelta: '',
                    },
                    accion: {},
                    equipo: {},
                    cliente:{}
                },
                select: {
                    estado: [],
                },
                parametro: {
                    estado: { search: '', size: 3000 },
                },
                basetUri: '/casos',
                endUri: '/index',
                titulo: ['Casos de Equipos']
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
        })
            .catch((error) => {
                console.error('error:', error);
            });
    }

    render() {
        const { accion , equipo, cliente} = this.state;
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
                        numero: { name: 'Numero' },
                        tarea: { name: 'Tarea' },
                        fecha: { name: 'Fecha' },
                        hora: { name: 'Hora' },
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
                        label='Numero'
                        type='text'
                        value={item.numero}
                        name='numero'
                        onChange={this.changed}
                        placeholder='Numero'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.numero}
                    />
                    <FText
                        label='Tarea'
                        type='text'
                        value={item.tarea}
                        name='tarea'
                        onChange={this.changed}
                        placeholder='Tarea'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.tarea}
                    />
                    <FText
                        label='Fecha'
                        type='date'
                        value={item.fecha}
                        name='fecha'
                        onChange={this.changed}
                        placeholder='Fecha'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.fecha}
                    />
                    <FText
                        label='Hora'
                        type='time'
                        value={item.hora}
                        name='hora'
                        onChange={this.changed}
                        placeholder='Hora'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.hora}
                    />
                    <FSelectAjax
                        basetUri={'/accion'}
                        buscar_columna={'descripcion'}
                        colum={['id', 'descripcion']}
                        label={'Acciones'}
                        buscar_name={'accion'}
                        onChange={(id) => { this.changedId('item', item, 'acciones_id', id) }}
                        onForm={(data, btn) => { this.btnClose(btn); this.onForm(data, 'accion', clone.accion) }}
                        item={accion}
                        event={[]}
                        value={item.acciones_id}
                        modal_event={modal_event}
                        autoFocus
                        disabled={modal.disabled}
                        select={select.accion}
                        validate={resquest?.acciones_id}
                    />

                    <FSelectAjax
                        basetUri={'/equipo'}
                        buscar_columna={'nombre'}
                        colum={['id', 'nombre']}
                        label={'Equipo'}
                        buscar_name={'equipo'}
                        onChange={(id) => { this.changedId('item', item, 'equipos_id', id) }}
                        onForm={(data, btn) => { this.btnClose(btn); this.onForm(data, 'equipo', clone.equipo) }}
                        item={equipo}
                        event={[]}
                        value={item.equipos_id}
                        modal_event={modal_event}
                        autoFocus
                        disabled={modal.disabled}
                        select={select.equipo}
                        validate={resquest?.equipos_id}
                    />
                    
                    <FSelectAjax
                        basetUri={'/cliente'}
                        buscar_columna={'razon_social'}
                        colum={['id', 'razon_social']}
                        label={'Clientes'}
                        buscar_name={'cliente'}
                        onChange={(id) => { this.changedId('item', item, 'clientes_id', id) }}
                        onForm={(data, btn) => { this.btnClose(btn); this.onForm(data, 'cliente', clone.cliente) }}
                        item={cliente}
                        event={[]}
                        value={item.clientes_id}
                        modal_event={modal_event}
                        autoFocus
                        disabled={modal.disabled}
                        select={select.cliente}
                        validate={resquest?.clientes_id}
                    />
                    {/*<FSelectAjax
                        basetUri={'/cliente'}
                        buscar_columna={'razon_social'}
                        colum={['id', 'razon_social']}
                        label={'Clientes'}
                        onChange={(id) => {
                            this.setState({
                                item: {
                                    ...this.state.item,
                                    clientes_id: id
                                }
                            })
                        }}
                        value={item.clientes_id}
                        autoFocus
                        disabled={modal.disabled}
                        select={select.cliente}
                    />*/}

                    <FSelect
                        label={'Estado'}//titulo
                        name={'estado_id'}
                        value={item.estado_id}
                        colum={['id', 'descripcion']}//columna
                        onChange={this.changed}
                        validate={resquest?.estado_id}
                        disabled={modal.disabled}
                        select={select.estado}
                    />
                    <FText
                        label='Precio de movilida ida'
                        type='number'
                        value={item.precio_movilidad_ida}
                        name='precio_movilidad_ida'
                        onChange={this.changed}
                        placeholder='precio de movilida ida'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.precio_movilidad_ida}
                    />
                    <FText
                        label='Precio de movilida vuelta'
                        type='number'
                        value={item.precio_movilidad_vuelta}
                        name='precio_movilidad_vuelta'
                        onChange={this.changed}
                        placeholder='precio de movilida vuelta'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.precio_movilidad_vuelta}
                    />
                </FForm>

            </>
        );
    }

}

export default Casos;