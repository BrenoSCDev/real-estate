import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


interface ICarouselComponent {
  images: string[]
}


function CarouselComponent({ images }: ICarouselComponent) {
  return (
    <Carousel>
      {images.map((imageUrl, index) => (
        <Carousel.Item key={index} style={{height: '18em'}}>
          <img src={imageUrl} alt={'Loading...'} className='d-block w-100 d-block h-100'/>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
