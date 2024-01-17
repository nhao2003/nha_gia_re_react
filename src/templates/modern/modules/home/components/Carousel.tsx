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
  isAutoPlay?: boolean; // Thêm thuộc tính tự động cuộn slide
}

export const Carousel = ({ slides, style, isAutoPlay = true }: carouselInterface) => {
  const [slide, setSlide] = useState(0);

  function isVideo(src: string) {
    return src.includes('video');
  }

  const nextSlide = () => {
    setSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  // Tự động cuộn slide mỗi 3 giây
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      if (!isAutoPlay) return; // Nếu không tự động cuộn thì return luôn
      nextSlide();
    }, 3000);

    // Clear interval khi component unmount để tránh memory leak
    return () => clearInterval(autoScrollInterval);
  }, [slide]); // Thêm slide vào dependency để đảm bảo effect chỉ chạy khi slide thay đổi

  return (
    <div className='carousel' style={style}>
      <BsArrowLeftCircleFill
        style={
          {
            zIndex: 1000,
          }
        }
        onClick={prevSlide} className='arrow arrow-left' />
      {slides.map((item, idx) => {
        return (
          // <img
          //   src={item.src}
          //   alt={item.alt}
          //   key={idx}
          //   className={slide === idx ? 'slide' : 'slide slide-hidden'}
          //   style={{ objectFit: 'cover' }}
          // />
          <div
            key={idx}
            className={slide === idx ? 'slide' : 'slide slide-hidden'}
            style={{ objectFit: 'cover' }}
          >

            {isVideo(item.src) ? (
              <video autoPlay muted loop style={{ width: '100%', height: '100%' }}>
                <source src={item.src} type='video/mp4' />
              </video>
            ) : (
              <img src={item.src} alt={item.alt} style={{ width: '100%', height: '100%' }} />
            )}
          </div>
        );
      })}
      <BsArrowRightCircleFill
        style={
          {
            zIndex: 1000,
          }
        }
        onClick={nextSlide} className='arrow arrow-right' />
      <span className='indicators'>
        {slides.map((_, idx) => {
          return (
            <button
              style={{
                zIndex: 1000,
              }}
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
