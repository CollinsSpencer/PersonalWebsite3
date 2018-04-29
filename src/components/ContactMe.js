import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/fontawesome-free-brands';

import '../styles/css/ContactMe.css';

export default class ContactMe extends Component {
    render() {
        return (
            <div className='section text-dark'>
                <div>
                    <h2 className='heading-bars'>Let's get in touch</h2>
                    <div>
                        <a className='contact-links' href="https://www.linkedin.com/in/spencer-collins">
                            <FontAwesomeIcon icon={faLinkedin} size="6x" />
                        </a>
                        <a className='contact-links' href='https://github.com/CollinsSpencer'>
                            <FontAwesomeIcon icon={faGithub} size="6x" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
