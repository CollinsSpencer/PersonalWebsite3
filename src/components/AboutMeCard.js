import React, { Component } from 'react';

export default class AboutMeCard extends Component {
    render() {
        const picture = {
            backgroundImage: `url(${this.props.image})`
        }
        const imageClass = this.props.imageClass ? this.props.imageClass : '';
        return (
            <div className='card'>
                <div className='card-image'><div className={`image ${imageClass}`} style={picture} /></div>
                <div className='card-text'>
                    <h3 className='card-heading'>{this.props.heading}</h3>
                    <h4 className='card-subheading'>{this.props.subheading}</h4>
                    <div className='card-body'>{this.props.body}</div>
                </div>
            </div>
        );
    }
}
