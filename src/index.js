import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Client from './components/Client';

import AppStore from './stores/AppStore';
import FormStore from './stores/FormStore';
import GridStore from './stores/GridStore';
import ArtworkPageStore from './stores/ArtworkPageStore';

render(<Client stores={{AppStore, FormStore, GridStore, ArtworkPageStore}}/>, document.getElementById('root'));
