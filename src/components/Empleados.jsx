import React from 'react';

import FText from '../widgets/FText';
import FSelect from '../widgets/FSelect';
import FModal from '../widgets/FModal';
import FTable from '../widgets/FTable';
import FForm from '../widgets/FForm';

import axiosInstance from '../interceptors/axiosConfig';

class Empleados extends FModal {
    constructor(props) {
        super(props,{
            state : {
                item: {
                    id: 0,
                    nombres: '',
                    apel_paterno: '',
                    apel_materno: '',
                    tipo_documento_id: 0,
                    numero_documento: '',
                    telefono: '',
                    correo: '',
                },
                clone: {
                    item: {
                        id: 0,
                        nombres: '',
                        apel_paterno: '',
                        apel_materno: '',
                        tipo_documento_id: 0,
                        numero_documento: '',
                        telefono: '',
                        correo: '',
                    }
                },
                select: {
                    tipo_documento: []
                },
                parametro: {
                    tipo_documento: { search: '', size: 2000 },
                },
                basetUri: '/empleado',
                endUri: '/index',
                titulo: ['Empleados']
            }
        });
        this.select();
    }

    select() {
        axiosInstance.post(this.state.basetUri + '/select', this.state.parametro)
            .then((response) => {
                this.setState({
                    select: {
                        tipo_documento: response.data.tipo_documento.data.data
                    }
                });
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
                        nombres: { name: 'Nombres' },
                        apel_paterno: { name: 'Apel. Paterno' },
                        apel_materno: { name: 'Apel. Materno' },
                        tipo_documento: { name: 'Tipo documento', object: ['descripcion'] },
                        numero_documento: { name: 'Numero documento' },
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
                        value={item.nombres}
                        name='nombres'
                        onChange={this.changed}
                        placeholder='Nombre'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.nombres}
                    />
                    <FText
                        label='Apellido paterno'
                        type='text'
                        value={item.apel_paterno}
                        name='apel_paterno'
                        onChange={this.changed}
                        placeholder='apellido paterno'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.apel_paterno}
                    />
                    <FText
                        label='Apellido materno'
                        type='text'
                        value={item.apel_materno}
                        name='apel_materno'
                        onChange={this.changed}
                        placeholder='apellido materno'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.apel_materno}
                    />

                    <FSelect
                        label={'Tipo documento'}//titulo
                        name={'tipo_documento_id'}
                        value={item.tipo_documento_id}
                        colum={['id', 'descripcion']}//columna
                        onChange={this.changed}
                        validate={resquest?.tipo_documento_id}
                        disabled={modal.disabled}
                        select={select.tipo_documento}
                    />

                    <FText
                        label='Numero de documento'
                        type='text'
                        value={item.numero_documento}
                        name='numero_documento'
                        onChange={this.changed}
                        placeholder='numero de documento'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.numero_documento}
                    />

                    <FText
                        label='Telefono'
                        type='text'
                        value={item.telefono}
                        name='telefono'
                        onChange={this.changed}
                        placeholder='Telefono'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.telefono}
                    />

                    <FText
                        label='Correo'
                        type='text'
                        value={item.correo}
                        name='correo'
                        onChange={this.changed}
                        placeholder='Correo'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.correo}
                    />

                </FForm>
            </>
        );
    }

}

export default Empleados;