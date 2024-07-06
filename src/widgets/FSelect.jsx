import PropTypes from 'prop-types';
import React from 'react';
import { Form, Badge} from 'react-bootstrap';

class FSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const {  } = this.state;
        const { label, value, name, onChange, disabled,colum,select,validate} = this.props;

        return (
            <>
                <>

                    <Form.Group className="mb-3" >
                        <Form.Label>{label}</Form.Label>
                        <Form.Select
                            value={value}
                            name={name}
                            onChange={onChange}
                            disabled={disabled}
                            isValid={validate?.length == 0?true:validate==undefined }
                            isInvalid={validate?.length > 0?true:validate!=undefined}  
                        >
                            <option> -- seleccionar --</option>
                            {select?.map((o) => <option value={o[colum[0]]}>{colum.length > 2
                                                            ? `${o[colum[1]]} | ${o[colum[2]]}`
                                                            : o[colum[1]]}</option>)}
                        </Form.Select>
                        {validate?.map((o)=><Badge pill bg="danger"> {o}</Badge>)}
                    </Form.Group>
                </>
            </>
        );
    }
}

FSelect.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    colum: PropTypes.array.isRequired,
    select: PropTypes.array.isRequired,
    validate   : PropTypes.object,
};

export default FSelect;
