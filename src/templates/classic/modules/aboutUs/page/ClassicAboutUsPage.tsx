import React from "react";
import '../../../../../assets/styles/css/general.css';
import '../../../../../assets/styles/css/queries.css';
import '../../../../../assets/styles/css/style.css'
import nha from '../../../../../assets/img/nha.png';
import trangchu from '../../../../../assets/img/trangchu.png';
import trangdangtin from '../../../../../assets/img/trangdangtin.png';
import trangcanhan from '../../../../../assets/img/trangcanhan.png';
import hao from '../../../../../assets/img/hao.jpg';
import minh from '../../../../../assets/img/minh.jpg';
import sang from '../../../../../assets/img/sang.jpg';
import huy from '../../../../../assets/img/huy.jpg';
import thu from '../../../../../assets/img/thu.jpg';
import tom_rumble from '../../../../../assets/img/tom_rumble.jpg';
import home from '../../../../../assets/img/home.jpg';
import image_3 from '../../../../../assets/img/image-3.jpg';
import R from '../../../../../assets/img/R.jpg';
import Screenshot_2_2_810x464 from '../../../../../assets/img/Screenshot_2-2-810x464.jpg';
import Screenshot_2024_01_16_131714 from '../../../../../assets/img/Screenshot 2024-01-16 131714.png';
import _2858_Interior_House_Scene_Sketchup_Model_By_VoDucDuy_Free_Download_3_768x432 from '../../../../../assets/img/2858-Interior-House-Scene-Sketchup-Model-By-VoDucDuy-Free-Download-3-768x432.jpg';
import _0deb0675e670abff8f99a9b8269a37e6 from '../../../../../assets/img/0deb0675e670abff8f99a9b8269a37e6.jpg';
function ClassicAboutUsPage() {
    return (
<div>
  <section className="section-hero">
    <div className="hero">
      <div className="hero-text-box">
        <h1 className="heading-primary">
          Tìm nhà đúng chỗ - Đầu tư thông minh!
        </h1>
        <p className="hero-description">
          Tìm kiếm ngôi nhà ưng ý với trải nghiệm mua bán bất động sản thuận
          lợi. Đầu tư dễ dàng với sự đa dạng và tiện ích tuyệt vời.
        </p>
        <a href="#cta" className="btn btn--full margin-right-sm">
          Bắt đầu trang web
        </a>
        <a href="#how" className="btn btn--outline">
          Tìm hiểu thêm ↓
        </a>
      </div>
      <div className="hero-img-box">
        <picture>
          <img
            src={nha}
            className="hero-img"
            alt="Các dự án đang thi công, khu nhà cao cấp"
          />
        </picture>
      </div>
    </div>
  </section>
  <section className="section-how" id="how">
    <div className="container">
      <span className="subheading" style={{ fontSize: "x-large" }}>
        Giới thiệu
      </span>
      <h2 className="heading-secondary">Trang website có ba chức năng chính</h2>
    </div>
    <div className="container grid grid--2-cols grid--center-v">
      <div className="step-text-box">
        <p className="step-number">01</p>
        <h3 className="heading-tertiary">
          Bạn có thể tìm kiếm các bài đăng về giao dịch bất động sản
        </h3>
        <p className="step-description">
          Trang mua bán và cho thuê sẽ giúp bạn có thể tìm được các ngôi nhà cần
          thiết cho mình. bạn cũng có thể tìm được một để đặt văn phòng một cách
          dễ dàng.
        </p>
      </div>
      <div className="step-img-box">
        <img
          src={trangchu}
          className="step-img"
          alt="iPhone app
      preferences selection screen"
        />
      </div>
      <div className="step-img-box">
        <img
          src={trangdangtin}
          className="step-img"
          alt="iPhone app
      meal approving plan screen"
        />
      </div>
      <div className="step-text-box">
        <p className="step-number">02</p>
        <h3 className="heading-tertiary">
          Bạn có thể đăng tin khi có nhu cầu giao dịch
        </h3>
        <p className="step-description">
          Không chỉ tìm các bất động sản muốn mua (thuê) bạn còn có thể đăng tin
          khi cần bán (cho thuê) một ngôi nhà hoặc văn phòng một cách dễ dàng.
        </p>
      </div>
      <div className="step-text-box">
        <p className="step-number">03</p>
        <h3 className="heading-tertiary">
          Bạn sẽ bảo mật các thông tin của mình
        </h3>
        <p className="step-description">
          Bạn có thể an tâm khi đăng tin trên trang web. Bạn sẽ được bảo mật các
          thông tin của mình khi đăng ký tài khoản.
        </p>
      </div>
      <div className="step-img-box">
        <img
          src={trangcanhan}
          className="step-img"
          alt="iPhone app
      delivery screen"
        />
      </div>
    </div>
  </section>
  <section className="section-testimonials" id="testimonials">
    <div className="testimonials-container">
      <span className="subheading" style={{ fontSize: "x-large" }}>
        Thành viên
      </span>
      <div className="testimonials">
        <figure className="testimonial">
          <img
            className="testimonial-img"
            alt="Photo of customer Dave Bryson"
            src={hao}
          />
          <p className="testimonial-name"> Nguyễn Nhật Hào - 21522046</p>
        </figure>
        <figure className="testimonial">
          <img
            className="testimonial-img"
            alt="Photo of customer Ben Hadley"
            src={minh}
          />
          <p className="testimonial-name"> Phan Văn Minh - 21522345</p>
        </figure>
        <figure className="testimonial">
          <img
            className="testimonial-img"
            alt="Photo of customer Steve Miller"
            src={sang}
          />
          <p className="testimonial-name">Thạch Sang - 21522546</p>
        </figure>
        <figure className="testimonial">
          <img
            className="testimonial-img"
            alt="Photo of customer Hannah Smith"
            src={huy}
          />
          <p className="testimonial-name">Đào Xuân Huy - 21520913</p>
        </figure>
        <figure className="testimonial">
          <img
            className="testimonial-img"
            alt="Photo of customer Hannah Smith"
            src={thu}
          />
          <p className="testimonial-name">Đặng Ngọc Minh Thư - 21521487</p>
        </figure>
      </div>
    </div>
    <div className="gallery">
      <figure className="gallery-item">
        <img
          src={tom_rumble}
          alt="Photo of beautifully
      arranged food"
        />
      </figure>
      <figure className="gallery-item">
        <img
          src={nha}
          alt="Photo of beautifully
      arranged food"
        />
      </figure>
      <figure className="gallery-item">
        <img
          src={home}
          alt="Photo of beautifully
      arranged food"
        />
      </figure>
      <figure className="gallery-item">
        <img
          src={image_3}
          alt="Photo of beautifully
      arranged food"
        />
      </figure>
      <figure className="gallery-item" style={{ marginTop: "4.5rem" }}>
        <img
          src={_0deb0675e670abff8f99a9b8269a37e6}
          alt="Photo of beautifully
      arranged food"
        />
      </figure>
      <figure className="gallery-item">
        <img
          src={Screenshot_2024_01_16_131714}
          alt="Photo of beautifully
      arranged food"
        />
      </figure>
      <figure className="gallery-item">
        <img
          src={_2858_Interior_House_Scene_Sketchup_Model_By_VoDucDuy_Free_Download_3_768x432}
          alt="Photo of beautifully
      arranged food"
        />
      </figure>
      <figure className="gallery-item">
        <img
          src={R}
          alt="Photo of beautifully
      arranged food"
        />
      </figure>
      <figure className="gallery-item">
        <img
          src={Screenshot_2_2_810x464}
          alt="Photo of beautifully
      arranged food"
        />
      </figure>
    </div>
  </section>
</div>

    );
}

export default ClassicAboutUsPage ;