import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
