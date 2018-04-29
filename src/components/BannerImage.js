import React, { Component } from 'react';

import '../styles/css/BannerImage.css';

export default class BannerImage extends Component {
    render() {
        const picture = {
            backgroundImage: `url(${this.props.image})`
        }
        return (
            <div className='banner text-light'>
                <div className='banner-image-container'>
                    <div className='banner-image' style={picture}></div>
                </div>
                <div className='banner-title-container'>
                    <div className='banner-pretitle'>{this.props.pretitle}</div>
                    <h1 className='banner-title heading-bars'>{this.props.title}</h1>
                </div>
            </div>
        );
    }
}
