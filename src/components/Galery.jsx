import React from 'react';
import { Carousel } from 'react-bootstrap';

const Galery = ({ productImages }) => {
    return (
        <Carousel variant="dark" className='images-carousel'>
            {
                productImages?.map(image => (
                    <Carousel.Item key={image} className='image-item'>
                        <img
                            src={image}
                            className="d-block w-100"
                            alt="First slide"
                        />
                    </Carousel.Item>
                ))
            }
        </Carousel>
    );
};

export default Galery;