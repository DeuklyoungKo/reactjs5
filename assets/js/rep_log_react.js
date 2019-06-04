import React from 'react';
import ReactDom from 'react-dom';

const el = React.createElement(
    'h2',
    null,
    'Lift history!',
    React.createElement('span', null, 'hart')
);

ReactDom.render(el, document.getElementById('lift-stuff-app'));
console.log(el);