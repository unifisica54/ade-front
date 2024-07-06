import React from 'react';

import FText from '../widgets/FText';
import FSelect from '../widgets/FSelect';
import FModal from '../widgets/FModal';
import FTable from '../widgets/FTable';
import FForm from '../widgets/FForm';

class Accion extends FModal {
    constructor(props) {
        super(props, {
            state: {
                item: {
                    id: 0,
                    descripcion: '',
                },
                clone: {
                    item: {
                        id: 0,
                        descripcion: '',
                    }
                },
                select: {
                },
                parametro: {
                },
                basetUri: '/accion',
                endUri: '/index',
                titulo: ['Accion']
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
                        label='Descripcion'
                        type='text'
                        value={item.descripcion}
                        name='descripcion'
                        onChange={this.changed}
                        placeholder='Descripcion'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.descripcion}
                    />
                </FForm>
            </>
        );
    }

}

export default Accion;