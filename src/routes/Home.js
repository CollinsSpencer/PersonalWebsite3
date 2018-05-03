import React, { Component } from 'react';

import AboutMe from '../components/AboutMe';
import BannerImage from '../components/BannerImage';
import ContactMe from '../components/ContactMe';
// import MySystem from '../components/MySystem';
import Pictures from '../components/Pictures';

import utahSelfie from '../images/utahSelfie.JPG';
import pictures from '../images/LoadPictures';

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            images: pictures
        }
    }
    componentDidMount() {
        this.setState({
            images: pictures
        })
    }
    render() {
        return (
            <div className='colored-children'>
                <BannerImage image={utahSelfie} pretitle="Hey, I'm" title='Spencer Collins' />
                <AboutMe></AboutMe>
                <Pictures images={this.state.images}></Pictures>
                {/* <MySystem></MySystem> */}
                <ContactMe></ContactMe>
            </div>
        );
    }
}