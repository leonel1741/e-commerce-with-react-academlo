import '../styles/footer.css';
import React from 'react';

const Footer = () => {
    return (
        <footer className='footer-container'>
            <div className='footer-icons'>
                <a href='https://www.linkedin.com/in/leonel-alexander-condori-mamani-47bb7b249/' className='footer-icon'>
                    <i className="fa-brands fa-linkedin-in"></i>

                </a>
                <a href='https://github.com/leonel1741?tab=repositories' className='footer-icon'>
                    <i className="fa-brands fa-github"></i>
                </a>
            </div>
            <p>Made with ♥ by Leonel Condori </p>
        </footer>
    );
};

export default Footer;