import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
    const { className, ...otherProps } = props;

    /*
    console.log(props);
    console.log(className);
    console.log({...otherProps});
    */

    return (
        <button
            className={`btn ${props.className}`}
            {...otherProps}
        >{props.children}</button>

    )
}

Button.protoTypes = {
    className: PropTypes.string,
};

Button.defaultProps = {
    className: ''
};