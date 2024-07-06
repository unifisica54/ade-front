import React from 'react';
import FSelectAjax from '../widgets/FSelectAjax';
import FText from '../widgets/FText';
import FModal from '../widgets/FModal';
import FTable from '../widgets/FTable';
import FForm from '../widgets/FForm';

class NumeroOrden extends FModal {
    constructor(props) {
        super(props, {
            state: {
                show: false,
                showInput: {
                    numero_orden: false
                },
                item: {
                    id: 0,
                    refaccion_id: null,
                    numero_orden_id: null,
                },
                guia_devolucion: {},
                casos: {},
                numero_orden: {
                    id: 0,
                    numero: '',
                    cantidad: '',
                    casos_id: null,
                    guia_devolucion_id: null,
                },
                refaccion: {
                    id: 0,
                    numero_parte: '',
                    descripcion: '',
                },
                clone: {
                    item: {
                        id: 0,
                        refaccion_id: null,
                        numero_orden_id: null,
                    },
                    numero_orden: {
                        id: 0,
                        numero: '',
                        cantidad: '',
                        casos_id: null,
                        guia_devolucion_id: null
                    },
                    refaccion: {
                        id: 0,
                        numero_parte: '',
                        descripcion: '',
                    },
                    guia_devolucion: {},
                    casos: {},
                },
                select: {
                    numero_orden: [],
                    refaccion: [],
                    casos: [],
                    guia_devolucion: [],
                },
                resquest: {
                    numero_orden: [],
                    refaccion: []
                },
                basetUri: '/orden_refaccion',
                endUri: '/index',
                titulo: ['Numero de orden']
            }
        });
    }

    render() {
        const { clone, titulo } = this.state;
        const { refaccion, numero_orden, casos, guia_devolucion } = this.state;
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
                        numero_orden: { name: 'Numero Orden' },
                        numero_casos: { name: 'Numero Casos' },
                        numero_guia: { name: 'Numero Guia' },
                        numero_parte: { name: 'Numero Parte' },
                        cantidad:  { name:  'Cantidad'}
                    }}
                    onLoadClose={this.loadClose}
                />
                <FForm
                    btn={btn}
                    modal_event={modal_event}
                    onModalClose={this.handleModalClose}
                    onCreate={this.save}
                >
                    <FSelectAjax
                        basetUri={'/numero_orden'}
                        buscar_columna={'numero'}
                        colum={['id', 'numero']}
                        label={'Numero Orden'}
                        buscar_name={'numero_orden'}
                        onChange={(id) => { this.changedId('item', item, 'numero_orden_id', id) }}
                        onForm={(data, btn) => {this.setState({
                            resquest: {
                                numero_orden:[]
                            }
                        }); this.btnClose(btn); this.onForm(data, 'numero_orden', clone.numero_orden) }}
                        item={numero_orden}
                        event={['add', 'edit', 'delete', 'show']}
                        value={item.numero_orden_id}
                        modal_event={modal_event}
                        autoFocus
                        disabled={modal.disabled}
                        select={select.numero_orden}
                        validate={resquest?.numero_orden_id}
                        onRequest={(error) => {
                            this.setState({
                                resquest: {
                                    numero_orden:error
                                }
                            })
                        }}
                    >

                        <FText
                            label='Numero'
                            type='text'
                            value={numero_orden.numero}
                            name='numero'
                            onChange={(e) => this._changed(e, 'numero_orden')}
                            placeholder='numero'
                            autoFocus
                            disabled={modal.disabled}
                            validate={resquest?.numero_orden?.numero}
                        />
                        <FText
                            label='Cantidad'
                            type='number'
                            value={numero_orden.cantidad}
                            name='cantidad'
                            onChange={(e) => this._changed(e, 'numero_orden')}
                            placeholder='cantidad'
                            autoFocus
                            disabled={modal.disabled}
                            validate={resquest?.numero_orden?.cantidad}
                        />
                        <FSelectAjax
                            basetUri={'/casos'}
                            buscar_columna={'numero'}
                            colum={['id', 'numero']}
                            label={'Casos de Equipos'}
                            buscar_name={'casos'}
                            onChange={(id) => {
                                this.changedId('numero_orden', numero_orden, 'casos_id', id)

                            }}
                            onForm={(data, btn) => { this.btnClose(btn); this.onForm(data, 'casos', clone.casos) }}
                            item={casos}
                            event={[]}
                            value={numero_orden.casos_id}
                            modal_event={modal_event}
                            autoFocus
                            disabled={modal.disabled}
                            select={select.casos}
                            validate={resquest?.numero_orden?.casos_id}
                        />
                        <FSelectAjax
                            basetUri={'/guia_devolucion'}
                            buscar_columna={'numero'}
                            colum={['id', 'numero']}
                            label={'Guia de devolucion'}
                            buscar_name={'guia_devolucion'}
                            onChange={(id) => { this.changedId('numero_orden', numero_orden, 'guia_devolucion_id', id) }}
                            onForm={(data, btn) => { this.btnClose(btn); this.onForm(data, 'guia_devolucion', clone.guia_devolucion) }}
                            item={guia_devolucion}
                            event={[]}
                            value={numero_orden.guia_devolucion_id}
                            modal_event={modal_event}
                            autoFocus
                            disabled={modal.disabled}
                            select={select.guia_devolucion}
                            validate={resquest?.numero_orden?.guia_devolucion_id}
                        />

                    </FSelectAjax>
                    <FSelectAjax
                        basetUri={'/refaccion'}
                        buscar_columna={'numero_parte'}
                        colum={['id', 'numero_parte', 'descripcion']}
                        label={'Refaccion'}
                        buscar_name={'refaccion'}
                        onChange={(id) => { this.changedId('item', item, 'refaccion_id', id) }}
                        onForm={(data, btn) => { 
                            this.btnClose(btn);
                            this.onForm(data, 'refaccion', clone.refaccion) 
                        }}
                        item={refaccion}
                        event={['add', 'edit', 'delete', 'show']}
                        value={item.refaccion_id}
                        modal_event={modal_event}
                        autoFocus
                        disabled={modal.disabled}
                        select={select.refaccion}
                        validate={resquest?.refaccion_id}
                        onRequest={(error) => {
                            this.setState({
                                resquest: {
                                    refaccion:error
                                }
                            })
                        }}
                    >

                        <FText
                            label='Numero de partes'
                            type='text'
                            value={refaccion.numero_parte}
                            name='numero_parte'
                            onChange={(e) => this._changed(e, 'refaccion')}
                            placeholder='numero de parte'
                            autoFocus
                            disabled={refaccion.disabled}
                            validate={resquest?.refaccion?.numero_parte}
                        />
                        <FText
                            label='Descripcion'
                            type='text'
                            value={refaccion.descripcion}
                            name='descripcion'
                            onChange={(e) => this._changed(e, 'refaccion')}
                            placeholder='descripcion'
                            autoFocus
                            disabled={refaccion.disabled}
                            validate={resquest?.refaccion?.descripcion}
                        />
                    </FSelectAjax>
                </FForm>


            </>
        );
    }

}

export default NumeroOrden;