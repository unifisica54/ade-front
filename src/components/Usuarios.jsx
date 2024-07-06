import React from 'react';

import FText from '../widgets/FText';
import FSelect from '../widgets/FSelect';
import FModal from '../widgets/FModal';
import FTable from '../widgets/FTable';
import FForm from '../widgets/FForm';

class Usuarios extends FModal {
    constructor(props) {
        super(props, {
            state: {
                item: {
                    id: 0,
                    name: '',
                    email: '',
                    password: '',
                },
                clone: {
                    item: {
                        id: 0,
                        name: '',
                        email: '',
                        password: '',
                    }
                },
                select: {
                },
                parametro: {
                },
                basetUri: '/user',
                endUri: '/index',
                titulo: ['Usuarios']
            }
        });
        this.select();
    }

    select() {

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
                        name: { name: 'Nombre' },
                        email: { name: 'Correo' },
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
                        value={item.name}
                        name='name'
                        onChange={this.changed}
                        placeholder='Nombre'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.name}
                    />
                    <FText
                        label='Correo'
                        type='text'
                        value={item.email}
                        name='email'
                        onChange={this.changed}
                        placeholder='Correo'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.email}
                    />
                    <FText
                        label='Contraseña'
                        type='text'
                        value={item.password}
                        name='password'
                        onChange={this.changed}
                        placeholder='Contraseña'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.password}
                    />
                </FForm>

            </>
        );
    }

}

export default Usuarios;