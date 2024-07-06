import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
function W(props) {
    return (
        <>
        <div className='mt-3'>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={12}>
                        <ListGroup as="ul" >
                            {props.menu.map((o) =>
                                <ListGroup.Item as="li" onClick={() => window.location.href = o.uri} className={(o.active ? `active` : `bg-dark text-white`) + ` m-0 rounded border-0 `}  >

                                    <i className={`bi ${o.icon}`}></i>
                                    <span className={`ms-1 d-none ` + (props.sidebar ? `d-sm-inline` : ``)}>{o.name}</span>

                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            </Tab.Container>
            </div>
        </>
    )
}

W.prototype = {
    menu: PropTypes.array,
    sidebar: PropTypes.bool
}
export default W;