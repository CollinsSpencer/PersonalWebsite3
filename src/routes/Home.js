import React, { Component } from 'react';

import AboutMe from '../components/AboutMe';
import BannerImage from '../components/BannerImage';
import ContactMe from '../components/ContactMe';
import MySystem from '../components/MySystem';
import Pictures from '../components/Pictures';

import utahSelfie from '../images/GOPR1407.JPG';

export default class Home extends Component {
    render() {
        return (
            <div className='colored-children'>
                <BannerImage image={utahSelfie} pretitle="Hey, I'm" title='Spencer Collins' />
                <AboutMe></AboutMe>
                <Pictures></Pictures>
                <MySystem></MySystem>
                <ContactMe></ContactMe>
            </div>
        );
    }
}