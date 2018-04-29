import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AboutMeCard from './AboutMeCard';

import '../styles/css/AboutMe.css';

import kauffman from '../images/kauffman.jpg';
import hayneedle from '../images/hayneedle.jpg';

export default class AboutMe extends Component {
    render() {
        return (
            <div className='section text-dark'>
                <h2 className='heading-bars'>Here's what I've done so far</h2>
                <h2>in school</h2>
                <div className='container'>
                    <div>
                        I am studying software engineering through the Raikes School at the University of Nebraska-Lincoln.
                    </div>
                    <AboutMeCard image={kauffman}
                        heading={<Link to='https://raikes.unl.edu/'>Jeffrey S. Raikes School of Computer Science and Management</Link>}
                        subheading='Fall 2016 - present'
                        body={<div>
                            <p>
                                The Raikes School is a program through UNL that focuses on computer science, business management, and innovation.
                            </p>
                            <p>
                                RAIK 383H: Software Engineering <Link to='/Portfolio'>Portfolio</Link>
                            </p>
                        </div>}>
                    </AboutMeCard>
                </div>
                <h2>at work</h2>
                <div className='container'>
                    <AboutMeCard image={hayneedle}
                        heading='Hayneedle Inc.'
                        subheading='Summer 2017'
                        body={<p>
                            Check out my full portfolio here: <br />
                            <Link className="nav-link" to="/Portfolio">Portfolio</Link>
                        </p>}>
                    </AboutMeCard>

                    <AboutMeCard image={kauffman}
                        heading='Jeffrey S. Raikes School of Computer Science and Management'
                        subheading='Fall 2016 - present'
                        body={<p>
                            Check out my full portfolio here: <br />
                            <Link className="nav-link" to="https://raikes.unl.edu/">Portfolio</Link>
                        </p>}>
                    </AboutMeCard>
                </div>
            </div>
        );
    }
}
