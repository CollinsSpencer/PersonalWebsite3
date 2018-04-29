import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../styles/css/ScrollToTop.css';

function scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function () {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            }
            else clearInterval(scrollInterval);
        }, 15);
}

export default class ScrolltoTop extends Component {
    scrollToTop() {
        scrollToTop(300);
    }

    render() {
        return (
            <button className='ScrollToTop' onClick={this.scrollToTop}>
                <FontAwesome name='arrow-up' size='2x' />
            </button>
        );
    }
}
