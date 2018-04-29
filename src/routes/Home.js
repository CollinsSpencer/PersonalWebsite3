import React, { Component } from 'react';

import AboutMe from '../components/AboutMe';
import BannerImage from '../components/BannerImage';
import ContactMe from '../components/ContactMe';
import MySystem from '../components/MySystem';
import Pictures from '../components/Pictures';

import utahSelfie from '../images/GOPR1407.JPG';

const context = require.context('../images', true, /.jpg$/);

const pictures = [];
context.keys().forEach((key) => {
    const countryCode = key.split('./').pop() // remove the first 2 characters
        .substring(0, key.length - 6); // remove the file extension
    pictures[countryCode] = context(key);
});

export default class Home extends Component {
    render() {
        return (
            <div className='colored-children'>
                <BannerImage image={utahSelfie} pretitle="Hey, I'm" title='Spencer Collins' />
                <AboutMe></AboutMe>
                <Pictures pictures={pictures}></Pictures>
                <MySystem></MySystem>
                <ContactMe></ContactMe>
            </div>
        );
    }
}