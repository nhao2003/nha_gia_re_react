// About us page

import React from 'react';

function ModernAboutUsPage(): JSX.Element {
    return (
        <div>
            <section class="section-hero1">
        <div class="hero">
          <div class="hero-text-box">
            <h1 class="heading-primary">
              Tìm nhà đúng chỗ - Đầu tư thông minh!
            </h1>
            <p class="hero-description">
              Tìm kiếm ngôi nhà ưng ý với trải nghiệm mua bán bất động sản thuận 
              lợi. Đầu tư dễ dàng với sự đa dạng và tiện ích tuyệt vời.
            </p>
            <a href="#cta" class="btn btn--full1 margin-right-sm">Bắt đầu trang web</a>

            <a href="#how" class="btn btn--outline1">Tìm hiểu thêm &darr;</a>
          </div>
          <div class="hero-img-box">
            <picture>
              <img
                src="img/nha.png"
                class="hero-img"
                alt="Các dự án đang thi công, khu nhà cao cấp"
              />
            </picture>
          </div>
        </div>
      </section>


      <section class="section-how" id="how">
        <div class="container">
          <span class="subheading1" style="font-size: x-large;">Giới thiệu</span>
          <h2 class="heading-secondary">
            Trang website có ba chức năng chính
          </h2>
        </div>

        <div class="container grid grid--2-cols grid--center-v">
          <div class="step-text-box">
            <p class="step-number">01</p>
            <h3 class="heading-tertiary">
              Bạn có thể tìm kiếm các bài đăng về giao dịch bất động sản
            </h3>
            <p class="step-description">
              Trang mua bán và cho thuê sẽ giúp bạn có thể tìm được các ngôi nhà cần thiết cho mình.
              bạn cũng có thể tìm được một để đặt văn phòng một cách dễ dàng.
            </p>
          </div>

          <div class="step-img-box1">
            <img
              src="img/trangchu.png"
              class="step-img"
              alt="iPhone app
            preferences selection screen"
            />
          </div>

          <div class="step-img-box1">
            <img
              src="img/trangdangtin.png"
              class="step-img"
              alt="iPhone app
            meal approving plan screen"
            />
          </div>
          <div class="step-text-box">
            <p class="step-number">02</p>
            <h3 class="heading-tertiary">Bạn có thể đăng tin khi có nhu cầu giao dịch</h3>
            <p class="step-description">
              Không chỉ tìm các bất động sản muốn mua (thuê) bạn còn có thể đăng tin khi cần bán (cho thuê) một
              ngôi nhà hoặc văn phòng một cách dễ dàng.
            </p>
          </div>


          <div class="step-text-box">
            <p class="step-number">03</p>
            <h3 class="heading-tertiary">Bạn sẽ bảo mật các thông tin của mình</h3>
            <p class="step-description">
              Bạn có thể an tâm khi đăng tin trên trang web. Bạn sẽ được bảo mật các thông tin của mình
              khi đăng ký tài khoản.
            </p>
          </div>
          <div class="step-img-box1">
            <img
              src="img/trangcanhan.png"
              class="step-img"
              alt="iPhone app
            delivery screen"
            />
          </div>
        </div>
      </section>

      <section class="section-testimonials1" id="testimonials">
        <div class="testimonials-container">
          <span class="subheading1" style="font-size: x-large;">Thành viên</span>
          
          <div class="testimonials">
            <figure class="testimonial">
              <img
                class="testimonial-img"
                alt="Photo of customer Dave Bryson"
                src="img/hao.jpg"
              />
              <p class="testimonial-name"> Nguyễn Nhật Hào - 21522046</p>
            </figure>

            <figure class="testimonial">
              <img
                class="testimonial-img"
                alt="Photo of customer Ben Hadley"
                src="img/minh.jpg"
              />
              <p class="testimonial-name"> Phan Văn Minh - 21522345</p>
            </figure>

            <figure class="testimonial">
              <img
                class="testimonial-img"
                alt="Photo of customer Steve Miller"
                src="img/sang.jpg"
              />
              <p class="testimonial-name">Thạch Sang - 21522546</p>
            </figure>

            <figure class="testimonial">
              <img
                class="testimonial-img"
                alt="Photo of customer Hannah Smith"
                src="img/huy.jpg"
              />
              <p class="testimonial-name">Đào Xuân Huy - 21520913</p>
            </figure>

            <figure class="testimonial">
              <img
                class="testimonial-img"
                alt="Photo of customer Hannah Smith"
                src="img/thu.jpg"
              />
              <p class="testimonial-name">Đặng Ngọc Minh Thư - 21521487</p>
            </figure>
          </div>
        </div>

        <div class="gallery">
          <figure class="gallery-item">
            <img
              src="img/tom_rumble.jpg"
              alt="Photo of beautifully
            arranged food"
            />
           
          </figure>
          <figure class="gallery-item">
            <img
              src="img/nha.jpg"
              alt="Photo of beautifully
            arranged food"
            />
          </figure>
          <figure class="gallery-item">
            <img
              src="img/home.jpg"
              alt="Photo of beautifully
            arranged food"
            />
          </figure>
          <figure class="gallery-item">
            <img
              src="img/0deb0675e670abff8f99a9b8269a37e6.jpg"
              alt="Photo of beautifully
            arranged food"
            />
          </figure>
          <figure class="gallery-item" style="margin-top: 4.5rem;">
            <img
              src="img/Screenshot 2024-01-16 131714.png"
              alt="Photo of beautifully
            arranged food"
            />
          </figure>
          <figure class="gallery-item">
            <img
              src="img/image-3.jpg"
              alt="Photo of beautifully
            arranged food"
            />
          </figure>
          <figure class="gallery-item">
            <img
              src="img/2858-Interior-House-Scene-Sketchup-Model-By-VoDucDuy-Free-Download-3-768x432.jpg"
              alt="Photo of beautifully
            arranged food"
            />
          </figure>
          <figure class="gallery-item">
            <img
              src="img/R.jpg"
              alt="Photo of beautifully
            arranged food"
            />
          </figure>
          <figure class="gallery-item">
            <img
              src="img/Screenshot_2-2-810x464.jpg"
              alt="Photo of beautifully
            arranged food"
            />
          </figure>
        </div>
      </section>
        </div>
    );
}

export default ModernAboutUsPage;