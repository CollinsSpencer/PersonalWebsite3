import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import '../styles/css/Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className='App-header'>
                <div className='container'>
                    <Link className="nav-link back-button" to='/'><FontAwesome name='angle-left' /> back</Link>
                </div>
            </header>
        );
    }
}
