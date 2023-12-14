import React, { useState, useEffect } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import './Carousel.css';

interface carouselInterface {
  slides: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  style?: React.CSSProperties; // Thêm thuộc tính style
}

export const Carousel = ({ slides, style }: carouselInterface) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  // Tự động cuộn slide mỗi 3 giây
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      nextSlide();
    }, 3000);

    // Clear interval khi component unmount để tránh memory leak
    return () => clearInterval(autoScrollInterval);
  }, [slide]); // Thêm slide vào dependency để đảm bảo effect chỉ chạy khi slide thay đổi

  return (
    <div className='carousel' style={style}>
      <BsArrowLeftCircleFill onClick={prevSlide} className='arrow arrow-left' />
      {slides.map((item, idx) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={slide === idx ? 'slide' : 'slide slide-hidden'}
            style={{ objectFit: 'cover' }}
          />
        );
      })}
      <BsArrowRightCircleFill onClick={nextSlide} className='arrow arrow-right' />
      <span className='indicators'>
        {slides.map((_, idx) => {
          return (
            <button
              key={idx}
              className={slide === idx ? 'indicator' : 'indicator indicator-inactive'}
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
