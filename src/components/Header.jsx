import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }

}
Header.propTypes = {
    children : PropTypes.node
};
export default Header;