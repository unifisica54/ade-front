import PropTypes from 'prop-types';
import { Form, Badge } from 'react-bootstrap';

function W(props) {
    return (
        <>

            <Form.Group className="mb-3" >
                <Form.Label>{props.label}</Form.Label>
                <Form.Control
                    type={props.type}
                    value={props.value}
                    name={props.name}
                    className={props.class}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    isValid={props.validate?.length == 0?true:props.validate==undefined }
                    isInvalid={props.validate?.length > 0?true:props.validate!=undefined}  
                />
                {props.validate?.map((o)=><Badge pill bg="danger"> {o}</Badge>)}
            </Form.Group>
        </>
    )
}

W.prototype = {
    class: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value   : PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    validate   : PropTypes.object,
}
export default W;