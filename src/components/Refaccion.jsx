import React from 'react';

import FText from '../widgets/FText';
import FSelect from '../widgets/FSelect';
import FModal from '../widgets/FModal';
import FTable from '../widgets/FTable';
import FForm from '../widgets/FForm';

import axiosInstance from '../interceptors/axiosConfig';

class Refaccion extends FModal {
    constructor(props) {
        super(props,{
            state : {
                item: {
                    id: 0,
                    numero_parte: '',
                    descripcion: '',
                },
                clone: {
                    item: {
                        id: 0,
                        numero_parte: '',
                        descripcion: '',
                    }
                },
                select: {
                },
                parametro: {
                },
                basetUri: '/refaccion',
                endUri: '/index',
                titulo: ['Refaccion']
            }
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
                        numero_parte: { name: 'Numero de parte' },
                        descripcion: { name: 'Descripcion' },
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
                        label='Numero de partes'
                        type='text'
                        value={item.numero_parte}
                        name='numero_parte'
                        onChange={this.changed}
                        placeholder='numero de parte'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.numero_parte}
                    />
                    <FText
                        label='Descripcion'
                        type='text'
                        value={item.descripcion}
                        name='descripcion'
                        onChange={this.changed}
                        placeholder='descripcion'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.descripcion}
                    />
                </FForm>
            </>
        );
    }

}

export default Refaccion;