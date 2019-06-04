import React from 'react';
import ReactDom from 'react-dom';
/*

const el = React.createElement(
    'h2',
    null,
    'Lift history!',
    React.createElement('span', null, 'hart')
);
*/

const el = <h2>Lift Stuff! <span>hart</span></h2>

console.log(el);

ReactDom.render(el, document.getElementById('lift-stuff-app'));
