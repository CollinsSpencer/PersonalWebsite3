import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/css/AboutMe.css';

import kauffman from '../images/kauffman.jpg';

export default class AboutMe extends Component {
    render() {
        return (
            <div className='section text-dark'>
                <div>
                    <h2 className='heading-bars'>Here's what I've done so far</h2>
                </div>
                <div className='container'>
                    <div className='card'>
                        <div className='card-image'><img src={kauffman} /></div>
                        <div className='card-text'>
                            <h3 className='card-heading'>Portfolio of Code</h3>
                            <h4 className='card-subheading'>from RAIK 383H: Software Engineering</h4>
                            <div className='card-body'>
                                <p>
                                    Check out my full portfolio here: <br />
                                    <Link className="nav-link" to='/Portfolio'>Portfolio</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{padding: '25px'}}>
                        More to come!
                    </div>
                </div>
            </div>
        );
    }
}
