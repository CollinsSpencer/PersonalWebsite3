import React, { Component } from 'react';

import '../styles/css/Gallery.css';

export default class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = { images: this.props.images };
    }
    render() {
        const gallery = this.state.images.map((obj, i) => {
            return (
                <a
                    href={obj.src}
                    className='image-container'
                    key={i}
                    onClick={(e) => this.props.onClick(i, e)}
                >
                    <img src={obj.thumbnail} alt='' className='image' />
                </a>
            );
        });

        return (
            <div className='gallery-container'>
                {gallery}
            </div>
        );
    }
}
