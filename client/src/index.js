import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import Routes from './routes';
//import uuid from "uuid";
//import axios from "axios";

const  App  = () => (
    <Routes />
);

ReactDOM.render(<App />, document.getElementById('root'));
