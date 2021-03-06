import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AboutMeCard from './AboutMeCard';

import '../styles/css/AboutMe.css';

import bhmi from '../images/bhmi.png';
import hayneedle from '../images/hayneedle.jpg';
import hudl from '../images/hudl.png';
import kauffman from '../images/kauffman.jpg';
import nelnet from '../images/nelnet.png';
import vita from '../images/vita.png';
import WFF from '../images/WFF.png';

export default class AboutMe extends Component {
    render() {
        return (
            <div className='text-dark'>
                <div className='section'>
                    <h2 className='heading-bars'>Here's a taste of what I've done so far in school</h2>
                    <div className='container'>
                        <div>
                            I am studying software engineering through the Raikes School at the University of Nebraska-Lincoln.
                        </div>
                        <AboutMeCard image={nelnet}
                            imageClass='contain'
                            heading={<a href='https://www.nelnet.com/'>RAIK 383H: Software Engineering</a>}
                            subheading='Spring 2017'
                            body={<div>
                                <p>As part of the second year Raikes Software Engineering course, we developed a school tuition payment website. The project was sponsored by Nelnet.</p>
                                <p>For more details, check out my <Link to='/Portfolio'>Portfolio of Code</Link>, where I selected 5 snippets of code that demonstrate how I applied the software engineering principles that I learned.</p>
                            </div>}>
                        </AboutMeCard>
                        <AboutMeCard image={vita}
                            imageClass='contain'
                            heading={<a href='https://vita.unl.edu/'>CSE Ambassadors</a>}
                            subheading='2017-2018'
                            body={<div>
                                <p>Through the CSE Ambassadors club, I helped develop the UNL volunteer income tax assistance (VITA) website. In the first season of usage, there were over 2,000 people who interacted with the system to receive assistance with their taxes.</p>
                            </div>}>
                        </AboutMeCard>
                        <AboutMeCard image={WFF}
                            imageClass='contain'
                            heading={<a href='http://waterforfood.nebraska.edu/'>Design Studio Intern</a>}
                            subheading='Spring 2016'
                            body={<div>
                                <p>As a freshman in the Raikes School, I had the opportunity to intern for a Raikes Design Studio team. I interned for the Water for Food team were I helped develop a website where agricultural producers could visualize their resource usage. The goal is to reduce resource usage by making producers aware of their levels of usage.</p>
                            </div>}>
                        </AboutMeCard>
                        <AboutMeCard image={kauffman}
                            heading={<a href='https://raikes.unl.edu/'>Jeffrey S. Raikes School of Computer Science and Management</a>}
                            subheading='Fall 2016 - present'
                            body={<div>
                                <p>The Raikes School is a program through UNL that focuses on computer science, business management, and innovation.</p>
                            </div>}>
                        </AboutMeCard>
                    </div>
                </div>
                <div className='section'>
                    <h2 className='heading-bars'>Exposure in the field</h2>
                    <div className='container'>
                        <AboutMeCard image={hudl}
                            imageClass='contain'
                            heading={<a href='https://www.hudl.com/'>Hudl</a>}
                            subheading='Summer 2018'
                            body={<p>Development Intern</p>}>
                        </AboutMeCard>
                        <AboutMeCard image={hayneedle}
                            heading={<a href='https://www.hayneedle.com/'>Hayneedle Inc.</a>}
                            subheading='Summer 2017'
                            body={<p>RIA Developer Intern</p>}>
                        </AboutMeCard>
                        <AboutMeCard image={bhmi}
                            heading={<a href='https://www.bhmi.com/'>Baldwin Hackett & Meeks, Inc.</a>}
                            subheading='Summer 2016'
                            body={<p>Software Developer Intern</p>}>
                        </AboutMeCard>
                    </div>
                </div>
            </div>
        );
    }
}
