import React from 'react';
import FText from '../widgets/FText';
import FSelect from '../widgets/FSelect';
import FModal from '../widgets/FModal';
import FTable from '../widgets/FTable';
import FForm from '../widgets/FForm';

import axiosInstance from '../interceptors/axiosConfig';

class Clientes extends FModal {
    constructor(props) {
        super(props, {
            state: {
                item: {
                    id: 0,
                    ruc: '',
                    razon_social: '',
                    telefono: '',
                    correo: '',
                    direccion: '',
                    departamento_id: '',
                    provincia_id: '',
                    ubigeo_id: '',
                    distrito:{}
                },
                clone: {
                    item: {
                        id: 0,
                        ruc: '',
                        razon_social: '',
                        telefono: '',
                        correo: '',
                        direccion: '',
                        departamento_id: '',
                        provincia_id: '',
                        ubigeo_id: '',
                        distrito:{}
                    }
                },
                select: {
                    distrito: [],
                    provincia: [],
                    departamento: []
                },
                parametro: {
                    distrito: { search: '', size: 2000 },
                    provincia: { search: '', size: 2000 },
                    departamento: { search: '', size: 2000 }
                },
                basetUri: '/cliente',
                endUri: '/index',
                titulo: ['Clientes']
            }
        });
        this.select();
        
    }
    
    editar = (id) => {

        axiosInstance.get(this.state.basetUri + '/edit/' + id)
            .then((response) => {
                if (response.status == 200) {
                    setTimeout(() => {
                        this.setState({
                            item: response.data.data,
                            parametro: {
                                distrito: { search: '', size: 2000 },
                                provincia: { search: '', size: 2000 },
                                departamento: { search: '', size: 2000 }
                            },
                        });
                    }, 100);
                    setTimeout(() => {
                        this.select();
                    }, 200);
                }
            })
            .catch((error) => {
                console.error('error:', error);
            });
    }
    
    select() {
        axiosInstance.post(this.state.basetUri + '/select', this.state.parametro)
            .then((response) => {
                this.setState({
                    select: {
                        distrito: response.data.distrito.data.data,
                        provincia: response.data.provincia.data.data,
                        departamento: response.data.departamento.data.data
                    }
                });
            })
            .catch((error) => {
                console.error('error:', error);
            });
    }
    
    changedSelect = (e) => {
        const { name, value } = e.target;
        this.setState({
            item: {
                ...this.state.item,
                [name]: value
            }
        });
            setTimeout(() => {
                this.setState({
                    parametro: {
                        distrito: { search: this.state.item.ubigeo_id==undefined?'':this.state.item.ubigeo_id, size: 1875 },
                        provincia: { search: this.state.item.provincia_id==undefined?'':this.state.item.provincia_id, size: 197 },
                        departamento: { search: this.state.item?.departamento_id==undefined?'':this.state.item?.departamento_id, size: 26 }
                    }
                });
            }, 200);
    
            setTimeout(() => {
                this.select();
            }, 400);
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
                        ruc: { name: 'RUC' },
                        razon_social: { name: 'Razon Social' },
                        telefono: { name: 'Telefono' },
                        correo: { name: 'Correo' },
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
                        label='RUC'
                        type='text'
                        value={item.ruc}
                        name='ruc'
                        onChange={this.changed}
                        placeholder='RUC'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.ruc}
                    />
                    <FText
                        label='Razon Social'
                        type='text'
                        value={item.razon_social}
                        name='razon_social'
                        onChange={this.changed}
                        placeholder='Razon Social'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.razon_social}
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
                    <FText
                        label='Direccion'
                        type='text'
                        value={item.direccion}
                        name='direccion'
                        onChange={this.changed}
                        placeholder='Direccion'
                        autoFocus
                        disabled={modal.disabled}
                        validate={resquest?.direccion}

                    />
                    <FSelect
                        label={'Departamento'}//titulo
                        name={'departamento_id'}
                        value={item.departamento_id?item.departamento_id:item.distrito?.departamento_id}
                        colum={['ubigeo', 'nombre']}//columna
                        onChange={this.changedSelect}
                        validate={resquest?.departamento_id}
                        disabled={modal.disabled}
                        select={select.departamento}
                    />


                    <FSelect
                        label={'Provincia'}//titulo
                        name={'provincia_id'}
                        value={item.provincia_id?item.provincia_id:item.distrito?.provincia_id}
                        colum={['ubigeo', 'nombre']}//columna
                        onChange={this.changedSelect}
                        validate={resquest?.provincia_id}
                        disabled={modal.disabled}
                        select={select.provincia}
                    />

                    <FSelect
                        label={'Distrito'}//titulo
                        name={'ubigeo_id'}
                        value={item.ubigeo_id}
                        colum={['ubigeo', 'nombre']}//columna
                        onChange={this.changedSelect}
                        validate={resquest?.ubigeo_id}
                        disabled={modal.disabled}
                        select={select.distrito}
                    />

                </FForm>
                
            </>
        );
    }

}

export default Clientes;