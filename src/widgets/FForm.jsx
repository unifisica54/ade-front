import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'react-bootstrap';

class FForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            modal: {
                titulo: '',
                color: '',
                boton: false,
                disabled: true,
            }
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { modal_event } = this.props;
        if (modal_event != prevProps.modal_event) {
            if (modal_event === 'add') {
                this.add();
            }
            if (modal_event === 'edit') {
                this.edit();
            }
            if (modal_event === 'show') {
                this.show();
            }
            if (modal_event === 'save') {
                this.close();
            }

        }
    }

    edit = () => {
        this.setState({
            modal: {
                titulo: 'Actualizar',
                color: 'warning',
                disabled: false,
                boton: true,
            },
            show: true
        });
    }
    close = () => {
        this.setState({
            modal: {
                titulo: '',
                color: '',
                boton: false,
                disabled: true,
            },
            show: false
        });
    }

    show = () => {
        this.setState({
            modal: {
                titulo: 'Mostrar',
                color: 'primary',
                disabled: true,
                boton: false,
            },
            show: true
        });
    }

    add = () => {
        this.setState({
            modal: {
                titulo: 'Agregar',
                color: 'success',
                disabled: false,
                boton: true,
            },
            show: true
        });
    }

    handleClose = () => {
        this.setState({
            show: false
        });
        if (this.props.onModalClose) {
            this.props.onModalClose();
        }
    };

    handleShow = () => {
        this.setState({
            show: true
        });
    };


    save = () => {
        if (this.props.onCreate) {
            this.props.onCreate();
        }
    }

    render() {
        const { show, modal } = this.state;
        const { children, btn } = this.props;
        return (
            <>
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton className={`bg-${modal.color} text-white`}>
                        <Modal.Title>{modal.titulo}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {children}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className={`bg-${modal.color}`}>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cerrar
                        </Button>
                        {modal.boton && btn !== 0 && (
                            <Button className="border" variant={modal.color} onClick={this.save}>
                                Grabar
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

FForm.propTypes = {
    children: PropTypes.node,
    btn: PropTypes.number,
    modal_event: PropTypes.string.isRequired,
    onModalClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};

export default FForm;
