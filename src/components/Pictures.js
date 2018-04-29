import React, { Component } from 'react';

export default class Pictures extends Component {
    render() {
        console.log(this.props)
        return (
            <div className='section text-dark'>
                <div>
                    <h2 className='heading-bars'>A little of my perspective</h2>
                    <div>
                        {this.props.pictures.map((pic, i) => {
                            return (<img id={i} src={pic} alt='' />)
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
