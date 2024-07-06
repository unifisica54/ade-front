import React from 'react';
import axiosInstance from '../interceptors/axiosConfig';
const defaultConfig = {
    state: {}, // estado inicial
    endpoint: null, // ruta de api
    endpointForm: '/form', // ruta de api
    endpointCreate: '/create', // ruta de api
    endpointRemove: '/remove', // ruta de api
    endpointEnable: '/enable', // ruta de api
    endpointDisable: '/disable', // ruta de api
    picHead: false,
    title: null,
    title_add: '',
    size: 'sm',
    use_errors: false,
    auto_close: true,
};

class FModal extends React.Component {

    constructor(props, config = {}) {
        super(props);
        this.config = {
            ...defaultConfig,
            ...config
        };
        /*if (this.config.endpoint == null)
            this.config.endpoint = '/' + Util.decamelize(this.constructor.name.slice(0, -1));*/

        this.initialState = {
            open: false,
            loading: false,
            data_changed: false,
            item: {},
            files: null, // si es un objeto es porque tiene archivos
            error: null,
            errors: null,

            modal: {},
            modal_event: '',
            btn: 1,
            load: false,
            resquest: [],
            ...this.config.state,
        };

        this.state = { ...this.initialState };
    }

    clear = () => {
        this.setState({
            item: {}
        });
    }

    btnClose = (btn) => {
        this.setState({
            btn: (btn == 0 ? this.state.btn * btn : this.state.btn + btn)
        })
    }

    handleModalClose = () => {
        this.setState({
            modal_event: '',
            btn: 1,
            resquest: []
        })
    };

    loadClose = () => {
        this.setState({
            load: false
        })
    };

    event = (name, id) => {
        if (name == 'delete') {
            this.delete(id);
        } else {
            this.setState({
                item: this.state.clone.item,
                modal_event: name,
                modal: {
                    disabled: name == 'show' ? true : false,
                }
            })
            if (name != 'add') {
                setTimeout(() => {
                    this.editar(id);
                }, 100);
            }
        }

    }

    save = () => {
        
        let uri = '';
        if (this.state.item.id == undefined || this.state.item.id == 0) {
            uri = this.state.basetUri + '/store';
        } else {
            uri = uri = this.state.basetUri + '/update/' + this.state.item.id;
        }
        axiosInstance.post(uri, this.state.item)
            .then((response) => {
                if (response.status == 200) {
                    setTimeout(() => {
                        this.setState({
                            load: true,
                            modal_event: 'save',
                            resquest: []
                        })
                    }, 100);
                }

            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    this.setState({ resquest: error.response.data.errors });
                } else {
                    console.error('An error occurred:', error);
                }
            });
    }


    delete = (id) => {

        axiosInstance.get(this.state.basetUri + '/delete/' + id)
            .then((response) => {
                if (response.status == 200) {
                    setTimeout(() => {
                        this.setState({
                            load: true
                        })
                    }, 100);
                }
            })
            .catch((error) => {
                console.error('error:', error);
            });
    };

    editar = (id) => {

        axiosInstance.get(this.state.basetUri + '/edit/' + id)
            .then((response) => {
                if (response.status == 200) {
                    setTimeout(() => {
                        this.setState({
                            item: response.data.data,
                            
                        });
                    }, 200);
                }
            })
            .catch((error) => {
                console.error('error:', error);
            });
    }

    clone = (object) => {
        return { ...object };
    }

    changed = (e, callback = null) => {
        const { name, value } = e.target;
        this.setState({
            item: {
                ...this.state.item,
                [name]: value
            },
        }, callback);

    };

    _changed = (e, item = 'item') => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            [item]: {
                ...prevState[item],
                [name]: value
            }
        }));
    };

    changedId = (raiz, item, fk, id) => {
        this.setState({
            [raiz]: {
                ...item,
                [fk]: id
            }
        })
    };

    onForm = (data, name, clone) => {
        this.setState({
            [name]: Object.keys(data).length == 0 ? clone : data
        })
    };

}

export default FModal;