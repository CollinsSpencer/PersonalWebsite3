import React, { Component } from 'react';
import Lightbox from 'react-images';

import Gallery from './Gallery';

export default class Pictures extends Component {
    constructor(props) {
        super(props);
        this.state = { currentImage: 0, images: [] };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }
    openLightbox(index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }
    render() {
        return (
            <div className='section text-dark'>
                <div>
                    <h2 className='heading-bars'>A little of my perspective</h2>

                    <div className='mx-3'>
                        <Gallery images={this.props.images} onClick={this.openLightbox} />
                        <Lightbox images={this.props.images}
                            onClose={this.closeLightbox}
                            onClickPrev={this.gotoPrevious}
                            onClickNext={this.gotoNext}
                            currentImage={this.state.currentImage}
                            isOpen={this.state.lightboxIsOpen}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
