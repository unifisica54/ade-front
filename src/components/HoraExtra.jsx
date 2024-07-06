import React from 'react';
import FText from '../widgets/FText';
import FModal from '../widgets/FModal';
import FTable from '../widgets/FTable';
import FForm from '../widgets/FForm';
import FSelectAjax from '../widgets/FSelectAjax';

import axiosInstance from '../interceptors/axiosConfig';

class HoraExtra extends FModal {
    constructor(props) {
        super(props, {
            state: {
                item: {
                    id: 0,
                    inicio: '',
                    final: '',
                    casos_id: null,
                },
                casos:{},
                clone: {
                    item: {
                        id: 0,
                        inicio: '',
                        final: '',
                        casos_id: null,
                    },
                    casos:{}
                },
                select: {
                    casos:[]
                },
                parametro: {
                },
                basetUri: '/hora_extra',
                endUri: '/index',
                titulo: ['Horas extras']
            }
        });
    }

    render() {

        const { clone, titulo } = this.state;
        const { casos } = this.state;
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
                        numero : { name: 'Casos equipos'},
                        inicio: { name: 'Hora inicio' },
                        final: { name: 'Hora final' },
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
                            basetUri={'/casos'}
                            buscar_columna={'numero'}
                            colum={['id', 'numero','tarea']}
                            label={'Casos de Equipos'}
                            buscar_name={'casos'}
                            onChange={(id) => {
                                this.changedId('item', item, 'casos_id', id)

                            }}
                            onForm={(data, btn) => { this.btnClose(btn); this.onForm(data, 'casos', clone.casos) }}
                            item={casos}
                            event={[]}
                            value={item.casos_id}
                            modal_event={modal_event}
                            autoFocus
                            disabled={modal.disabled}
                            select={select.casos}
                            validate={resquest?.casos_id}
                        />
                    <FText
                        label='Hora de inicio'
                        type='time'
                        value={item.inicio}
                        name='inicio'
                        onChange={this.changed}
                        placeholder='hora de inicio'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.inicio}
                    />
                    <FText
                        label='Hora de fin'
                        type='time'
                        value={item.final}
                        name='final'
                        onChange={this.changed}
                        placeholder='hora de fin'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.final}
                    />

                </FForm>
            </>
        );
    }

}

export default HoraExtra;