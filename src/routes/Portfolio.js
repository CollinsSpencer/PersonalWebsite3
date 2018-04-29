import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import ScrollToTop from '../components/ScrollToTop';
import Header from '../components/Header';

import portfolioMdFilePath from '../content/Portfolio.md';

import '../styles/css/github-markdown.css';
import '../styles/css/Portfolio.css';

// From: https://github.com/rexxars/react-markdown/issues/69
function flatten(text, child) {
    return typeof child === 'string'
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text)
}

function HeadingRenderer(props) {
    var children = React.Children.toArray(props.children)
    var text = children.reduce(flatten, '')
    var slug = text.toLowerCase().replace(/\W/g, '-')
    return React.createElement('h' + props.level, { id: slug }, props.children)
}

export default class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: ''
        };
    }

    componentWillMount() {
        fetch(portfolioMdFilePath)
            .then(response => response.text())
            .then(text => {
                this.setState({
                    markdown: text
                })
            });
    }

    render() {
        const { markdown } = this.state;
        return (
            <div>
                <Header />
                <ReactMarkdown source={markdown} className='markdown-body Portfolio container' renderers={{ heading: HeadingRenderer }} />
                <ScrollToTop />
            </div>
        );
    }
}
