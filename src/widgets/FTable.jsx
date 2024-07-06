
import React from 'react';
import { Table } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Breadcrumb } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axiosInstance from '../interceptors/axiosConfig';
import PropTypes from 'prop-types';

class FTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buscar: {
                size: '5',
                search: ''
            },
            data: [],
            pagination: [],
            to: 0,
            total: 0,
            size: 0,
            basetUri: this.props.basetUri,
            endUri: this.props.endUri,
            rowsPerPageOptions: [5, 10, 15, 20, 25, 50, 100]
        };

        this.arrColumns = Object.entries(this.props.columns);

    }
    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps, prevState) {
        const { load } = this.props;
        if (load != prevProps.load) {
            this.load();
            if (this.props.onLoadClose) {
                this.props.onLoadClose();
            }
        }
    }
    load = () => {
        axiosInstance.post(this.state.basetUri + this.state.endUri, this.state.buscar)
            .then((response) => {
                this.setState({
                    data: response.data.data.data,
                    pagination: response.data.data.links,
                    to: response.data.data.from,
                    total: response.data.data.total,
                    size: response.data.data.per_page,
                });

            })
            .catch((error) => {
                console.error('error:', error);
            });
    }
    paginations = (uri) => {
        this.setState({
            endUri: (uri == null ? null : '/' + uri.split('/')[uri.split('/').length - 1]),
        });
        setTimeout(() => {
            this.load();
        }, 200);
    }

    sizePagination = (count) => {
        this.setState({
            buscar: {
                size: count
            },
            size: count
        });
        setTimeout(() => {
            this.load();
        }, 200);
    };

    buscar = () => {

        this.setState({
            buscar: {
                search: this.state.buscar.search,
                size: this.state.buscar.size
            },
        });
        setTimeout(() => {
            this.load();
        }, 200);
    };
    changed = (e, callback = null) => {

        const { name, value } = e.target;
        this.setState({
            buscar: {
                ...this.state.buscar,
                [name]: value
            }
        }, callback);
    }
    event = (name, id) => {
        this.props.event_name(name, id);
    }
    render() {
        const { data, pagination, to, total, size, buscar, rowsPerPageOptions } = this.state;
        const { event, titulo, columns } = this.props;
        return (<>
            <Breadcrumb className="px-3 py-1 text-white">
                {titulo.map((o) => <Breadcrumb.Item active>/ {o}</Breadcrumb.Item>)}
            </Breadcrumb>
            <div className="container ">

                <div className=" p-3">
                    <Row className="row clearfix">
                        <Col xs={12} md={8} lg={6}>
                            <InputGroup className="mb-3">

                                <Button variant="outline-secondary" id="button-addon1" type="button" onClick={this.buscar} ><i className="bi bi-search"></i> Buscar</Button >

                                <Form.Control
                                    type="text"
                                    aria-label="Buscar"
                                    aria-describedby="basic-addon1"
                                    value={buscar.search}
                                    name="search"
                                    onChange={this.changed}
                                    autoFocus
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={4} lg={6}>
                            {event.includes('add') && (
                                <button type="button" className="btn btn-success float-right " data-toggle="modal" data-target="#exampleModal" onClick={() => { this.event('add', 0) }} ><i className="bi bi-plus-circle-fill"></i> Agregar   </button>
                            )}
                        </Col>
                    </Row>
                    <ListGroup horizontal className=" my-3 justify-content-end">
                        <ListGroup.Item className="pb-0">
                            <Breadcrumb className="text-white">
                                <Breadcrumb.Item active>{to}</Breadcrumb.Item>
                                <Breadcrumb.Item active>{total}</Breadcrumb.Item>
                            </Breadcrumb>
                        </ListGroup.Item>
                        <ListGroup.Item className="pb-0">
                            <DropdownButton size="sm" id="dropdown-basic-button" title={`${size}`}>
                                {rowsPerPageOptions.map((o) => <Dropdown.Item onClick={() => this.sizePagination(o)} href='#'>{o}</Dropdown.Item>)}

                            </DropdownButton>
                        </ListGroup.Item>
                    </ListGroup>
                    <Table striped bordered hover responsive>
                        <thead className='border border-secondary '>
                            <tr >
                                <th scope="col">#</th>
                                {this.arrColumns.map(([key, val]) => {
                                    return <th scope="col">{val.name}</th>
                                })}
                            </tr>
                        </thead>
                        {data.map((o) =>
                            <tbody>
                                <tr>
                                    <th scope="row">{o.id}</th>
                                    {
                                        this.arrColumns.map(([key, val]) => {

                                            if (typeof val.object === 'undefined') {
                                                return <td>{o[key]}</td>

                                            } else if (val.object.length == 1) {

                                                return <td>{o[key] == null ? '' : o[key][val.object[0]]}</td>
                                                //console.log(o[key][val.object[0]]);
                                                //console.log(val.object);
                                            }
                                        })
                                    }
                                    <td><div className="btn-group" role="group" aria-label="Basic example">
                                        {event.includes('show') && (
                                            <button type="button" className="btn btn-primary" onClick={() => { this.event('show', o.id) }} ><i className="bi bi-eye-fill"></i></button>
                                        )}
                                        {event.includes('edit') && (
                                            <button type="button" className="btn btn-warning" onClick={() => { this.event('edit', o.id) }} ><i className="bi bi-pen-fill"></i></button>
                                        )}
                                        {event.includes('delete') && (
                                            <button type="button" className="btn btn-danger" onClick={() => { this.event('delete', o.id) }} ><i className="bi bi-trash-fill"></i></button>
                                        )}
                                    </div></td>
                                </tr>
                            </tbody>)}

                    </Table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            {pagination.map((p, index) =>
                                <li className="page-item">
                                    <button type='button' className={`page-link ${p.active ? 'active' : ''}`} onClick={() => this.paginations(p.url)}>
                                        {(index + 1) == pagination.length ? 'Siguiente' : (index == 0 ? 'Antes' : p.label)}
                                    </button>
                                </li>)}

                        </ul>
                    </nav>

                </div>

            </div>
        </>)
    }
}

FTable.propTypes = {
    children: PropTypes.node,
    basetUri: PropTypes.string.isRequired,
    endUri: PropTypes.string.isRequired,
    event: PropTypes.array.isRequired,
    event_name: PropTypes.func.isRequired,
    titulo: PropTypes.array.isRequired,
    columns: PropTypes.object,
    load: PropTypes.bool,
    onLoadClose: PropTypes.func.isRequired,
};
export default FTable;