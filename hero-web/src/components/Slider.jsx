import React, { useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import './Slider.css';

export default function Slider() {
  useEffect(() => {
    document.documentElement.classList.add('scroll-hide');

    function updateProgressBar(progress) {
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) progressBar.style.width = progress + '%';
    }

    function simulateProgress() {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1;
        updateProgressBar(progress);
        if (progress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            const loaderText = document.querySelectorAll('.loader-text h3');
            loaderText.forEach((text) => {
              const loaderSingleText = new SplitType(text, { types: 'chars' });
              gsap.from(loaderSingleText.chars, {
                opacity: 0,
                x: 50,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.8,
              });
            });

            gsap.to('.progress-wrapper', {
              scale: 1.5,
              opacity: 0,
              display: 'none',
              ease: 'power3.inOut',
              delay: 0.2,
              duration: 1.2,
            });

            gsap.to('.revealer', {
              top: '0%',
              ease: 'power3.inOut',
              delay: 1,
              duration: 2.2,
            });

            gsap.to('.loader', {
              yPercent: -100,
              ease: 'power3.inOut',
              delay: 1.9,
              duration: 1,
              onComplete: () => {
                document.documentElement.classList.remove('scroll-hide');
                // initialize nav links SplitType
                const navLinks = document.querySelectorAll('.nav-links li a');
                navLinks.forEach((link) => {
                  const text = new SplitType(link, { types: 'chars' });
                  text.chars.forEach((char, i) => {
                    char.style.transitionDelay = `${i * 0.05}s`;
                    char.setAttribute('data-letter', char.textContent);
                  });
                });

                // reveal masked images in sliders
                gsap.to('.img-slider li, .second-img-slider li, .third-img-slider li', {
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  duration: 0.5,
                  delay: 1.3,
                });
              },
            });
          }, 500);
        }
      }, 10);
    }

    simulateProgress();

    // Slider logic
    const slides = document.querySelectorAll('.img-slider ul li');
    const secondSlides = document.querySelectorAll('.second-img-slider ul li');
    const thirdSlides = document.querySelectorAll('.third-img-slider ul li');
    const secondSlider = document.querySelector('.second-img-slider');

    let currentActive = 1;
    let secondCurrentActive = 2;
    let thirdCurrentActive = 0;

    const imgSliderFirstChild = document.querySelector('.img-slider li:first-child');
    const imgSliderLastChild = document.querySelector('.img-slider li:last-child');
    const thirdImgSliderFirstChild = document.querySelector('.third-img-slider li:first-child');
    const secondImgSliderLastChild = document.querySelector('.second-img-slider li:last-child');

    function updateOpacityAndClip() {
      if (imgSliderFirstChild && thirdImgSliderFirstChild) {
        thirdImgSliderFirstChild.style.opacity = imgSliderFirstChild.classList.contains('show_class') && thirdImgSliderFirstChild.classList.contains('active') ? '0' : '1';
      }
      if (imgSliderLastChild && secondImgSliderLastChild && secondSlider) {
        if (imgSliderLastChild.classList.contains('show_class') && secondImgSliderLastChild.classList.contains('active')) {
          secondSlider.classList.add('clip');
        } else {
          secondSlider.classList.remove('clip');
        }
      }
    }

    function handleClick(event) {
      setTimeout(() => {
        updateOpacityAndClip();
      }, 201);

      if (event.clientX > window.innerWidth / 2) {
        if (currentActive < slides.length) {
          slides[currentActive].classList.add('active');
          currentActive++;
        }
        if (currentActive >= 2 && secondCurrentActive < secondSlides.length) {
          secondSlides[secondCurrentActive].classList.add('active');
          secondCurrentActive++;
        }
        if (currentActive >= 2 && thirdCurrentActive < thirdSlides.length - 1) {
          thirdSlides[thirdCurrentActive].classList.add('active');
          thirdCurrentActive++;
        }
      } else {
        if (currentActive > 1 && currentActive <= slides.length) {
          slides[currentActive - 1].classList.remove('active');
          currentActive--;
        }
        if (currentActive <= slides.length - 2 && secondCurrentActive > 2) {
          secondSlides[secondCurrentActive - 1].classList.remove('active');
          secondCurrentActive--;
        }
        if (currentActive <= slides.length - 1 && thirdCurrentActive > 0) {
          thirdSlides[thirdCurrentActive - 1].classList.remove('active');
          thirdCurrentActive--;
        }
      }
    }

    window.addEventListener('click', handleClick);

    // mousemove parallax for second/third sliders
    const secondImgSlider = document.querySelector('.second-img-slider ul');
    let secondTimer;
    function handleMouseMoveSecond(e) {
      clearTimeout(secondTimer);
      let xPos = e.clientX - window.innerWidth / 2;
      if (xPos < 0) xPos = 0;
      const rotation = xPos > 0 ? 15 : 0;
      gsap.to(secondImgSlider, { x: `${xPos}px`, rotation, duration: 1, ease: 'power2.out' });
      secondTimer = setTimeout(() => {
        gsap.to(secondImgSlider, { rotation: 0, duration: 0.5, ease: 'power2.out' });
      }, 500);
    }
    window.addEventListener('mousemove', handleMouseMoveSecond);

    const thirdImgSlider = document.querySelector('.third-img-slider ul');
    let thirdTimer;
    function handleMouseMoveThird(e) {
      clearTimeout(thirdTimer);
      let xPos = e.clientX - window.innerWidth / 2;
      if (xPos > 0) xPos = 0;
      const rotation = xPos < 0 ? -15 : 0;
      gsap.to(thirdImgSlider, { x: `${xPos}px`, rotation, duration: 1, ease: 'power2.out' });
      thirdTimer = setTimeout(() => {
        gsap.to(thirdImgSlider, { rotation: 0, duration: 0.5, ease: 'power2.out' });
      }, 500);
    }
    window.addEventListener('mousemove', handleMouseMoveThird);

    // content slider
    const contentItems = document.querySelectorAll('.content-slider li');
    let contentActiveIndex = 0;
    function handleClickContent(e) {
      setTimeout(() => {
        if (e.clientX > window.innerWidth / 2) {
          if (contentActiveIndex < contentItems.length - 1) contentActiveIndex++;
          contentItems[contentActiveIndex].classList.add('active');
        } else {
          if (contentActiveIndex > 0) {
            contentItems[contentActiveIndex].classList.remove('active');
            contentActiveIndex--;
          }
        }
      }, 200);
    }
    window.addEventListener('click', handleClickContent);

    // text animation for details
    const details = document.querySelectorAll('.img-slider li');
    let detailsActiveIndex = 0;
    function animateText(element) {
      const splitH6 = element.querySelectorAll('.img-details h6');
      splitH6.forEach((node) => {
        const text = new SplitType(node, { types: 'chars' });
        gsap.from(text.chars, { y: 50, duration: 0.5, stagger: 0.1 });
      });
      const splitSpan = element.querySelectorAll('.img-details span');
      splitSpan.forEach((node) => {
        const text = new SplitType(node, { types: 'chars' });
        gsap.from(text.chars, { y: 50, duration: 0.5, stagger: 0.1, delay: 0.2 });
      });
    }
    function handleClickDetails(e) {
      setTimeout(() => {
        if (e.clientX > window.innerWidth / 2) {
          if (detailsActiveIndex < details.length - 1) {
            details[detailsActiveIndex].classList.remove('show_class');
            detailsActiveIndex++;
            details[detailsActiveIndex].classList.add('show_class');
            animateText(details[detailsActiveIndex]);
          }
        } else {
          if (detailsActiveIndex > 0) {
            details[detailsActiveIndex].classList.remove('show_class');
            detailsActiveIndex--;
            details[detailsActiveIndex].classList.add('show_class');
            animateText(details[detailsActiveIndex]);
          }
        }
      }, 200);
    }
    window.addEventListener('click', handleClickDetails);

    // Mouse cursor animation
    gsap.set('.arrow', { xPercent: -50, yPercent: -50 });
    const arrow = document.querySelector('.arrow');
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15;
    const xSet = gsap.quickSetter(arrow, 'x', 'px');
    const ySet = gsap.quickSetter(arrow, 'y', 'px');

    function handleMouseMove(e) {
      arrow.style.opacity = 1;
      mouse.x = e.x;
      mouse.y = e.y;
      const img = document.querySelector('.arrow-img-wrapper');
      if (e.clientX > window.innerWidth / 2) {
        img.style.transform = 'scaleX(-1)';
      } else {
        img.style.transform = 'scaleX(1)';
      }
    }
    window.addEventListener('mousemove', handleMouseMove);
    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });

    // initial text animate after delay
    setTimeout(() => {
      const first = document.querySelectorAll('.img-slider li');
      if (first[0]) {
        const splitH6 = first[0].querySelectorAll('.img-details h6');
        splitH6.forEach((node) => {
          const text = new SplitType(node, { types: 'chars' });
          gsap.from(text.chars, { y: 50, duration: 0.5, stagger: 0.1 });
        });
        const splitSpan = first[0].querySelectorAll('.img-details span');
        splitSpan.forEach((node) => {
          const text = new SplitType(node, { types: 'chars' });
          gsap.from(text.chars, { y: 50, duration: 0.5, stagger: 0.1, delay: 0.2 });
        });
      }
    }, 3000);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMoveSecond);
      window.removeEventListener('mousemove', handleMouseMoveThird);
      window.removeEventListener('click', handleClickContent);
      window.removeEventListener('click', handleClickDetails);
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <>
      <div className="loader">
        <div className="revealer"></div>
        <div className="loader-text-wrapper">
          <div className="loader-text">
            <h3>HERO</h3>
          </div>
        </div>
        <div className="progress-wrapper">
          <div className="progress-line-wrapper">
            <span className="progress-line" id="progress-bar"></span>
          </div>
        </div>
      </div>
      <div className="arrow">
        <div className="arrow-img-wrapper">
          <img src="https://www.yudiz.com/codepen/gsap-slider/left-arrow.png" alt="arrow" className="img-fluid dark-arrow" />
        </div>
      </div>
      <div className="slider">
        <div className="content-slider">
          <ul>
            <li className="active">
              <div className="title-main">
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">Sosyal Medya</h1>
                  <h1>Sosyal Medya</h1>
                  <h1 className="t-stroke italic">Sosyal Medya</h1>
                  <h1>Sosyal Medya</h1>
                </div>
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">Sosyal Medya</h1>
                  <h1>Sosyal Medya</h1>
                  <h1 className="t-stroke italic">Sosyal Medya</h1>
                  <h1>Sosyal Medya</h1>
                </div>
              </div>
            </li>
            <li>
              <div className="title-main">
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">han so-hee</h1>
                  <h1>han so-hee</h1>
                  <h1 className="t-stroke italic">han so-hee</h1>
                  <h1>han so-hee</h1>
                </div>
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">han so-hee</h1>
                  <h1>han so-hee</h1>
                  <h1 className="t-stroke italic">han so-hee</h1>
                  <h1>han so-hee</h1>
                </div>
              </div>
            </li>
            <li>
              <div className="title-main">
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">Go Yoon Jung</h1>
                  <h1>Go Yoon Jung</h1>
                  <h1 className="t-stroke italic">Go Yoon Jung</h1>
                  <h1>Go Yoon Jung</h1>
                </div>
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">Go Yoon Jung</h1>
                  <h1>Go Yoon Jung</h1>
                  <h1 className="t-stroke italic">Go Yoon Jung</h1>
                  <h1>Go Yoon Jung</h1>
                </div>
              </div>
            </li>
            <li>
              <div className="title-main">
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">Han Hyo-joo</h1>
                  <h1>Han Hyo-joo</h1>
                  <h1 className="t-stroke italic">Han Hyo-joo</h1>
                  <h1>Han Hyo-joo</h1>
                </div>
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">Han Hyo-joo</h1>
                  <h1>Han Hyo-joo</h1>
                  <h1 className="t-stroke italic">Han Hyo-joo</h1>
                  <h1>Han Hyo-joo</h1>
                </div>
              </div>
            </li>
            <li>
              <div className="title-main">
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">kim So-eun</h1>
                  <h1>kim So-eun</h1>
                  <h1 className="t-stroke italic">kim So-eun</h1>
                  <h1>kim So-eun</h1>
                </div>
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">kim So-eun</h1>
                  <h1>kim So-eun</h1>
                  <h1 className="t-stroke italic">kim So-eun</h1>
                  <h1>kim So-eun</h1>
                </div>
              </div>
            </li>
            <li>
              <div className="title-main">
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">Song Hye-Kyo</h1>
                  <h1>Song Hye-Kyo</h1>
                  <h1 className="t-stroke italic">Song Hye-Kyo</h1>
                  <h1>Song Hye-Kyo</h1>
                </div>
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">Song Hye-Kyo</h1>
                  <h1>Song Hye-Kyo</h1>
                  <h1 className="t-stroke italic">Song Hye-Kyo</h1>
                  <h1>Song Hye-Kyo</h1>
                </div>
              </div>
            </li>
            <li>
              <div className="title-main">
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">seol in-ah</h1>
                  <h1>seol in-ah</h1>
                  <h1 className="t-stroke italic">seol in-ah</h1>
                  <h1>seol in-ah</h1>
                </div>
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">seol in-ah</h1>
                  <h1>seol in-ah</h1>
                  <h1 className="t-stroke italic">seol in-ah</h1>
                  <h1>seol in-ah</h1>
                </div>
              </div>
            </li>
            <li>
              <div className="title-main">
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">kim sejeong</h1>
                  <h1>kim sejeong</h1>
                  <h1 className="t-stroke italic">kim sejeong</h1>
                  <h1>kim sejeong</h1>
                </div>
                <div className="title-wrapper">
                  <h1 className="t-stroke italic">kim sejeong</h1>
                  <h1>kim sejeong</h1>
                  <h1 className="t-stroke italic">kim sejeong</h1>
                  <h1>kim sejeong</h1>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="third-img-slider">
          <ul>
            <li className="active">
              <img src="https://www.yudiz.com/codepen/gsap-slider/kwon-nara.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Sosyal Medya</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/han-soo-hee.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Han So-hee</h6>
                <span>Profession:- Actress </span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/go-yoon-jung.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Go Yoon Jung</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/han-hyo-joo.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Han hyo-Joo</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/kim-yoo-jung.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Kim yoo-jung</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/song-hye-kyo.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Song Hye-Kyo</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/seol-in-ah.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Seol in-ah</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/kim-sejeong.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Kim sejeong</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="img-slider">
          <ul>
            <li className="active show_class">
              <img src="https://www.yudiz.com/codepen/gsap-slider/kwon-nara.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Sosyal Medya</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/han-soo-hee.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Han So-hee</h6>
                <span>Profession:- Actress </span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/go-yoon-jung.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Go Yoon Jung</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/han-hyo-joo.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Han hyo-Joo</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/kim-yoo-jung.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Kim yoo-jung</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/song-hye-kyo.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Song Hye-Kyo</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/seol-in-ah.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Seol in-ah</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/kim-sejeong.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Kim sejeong</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="second-img-slider">
          <ul>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/kwon-nara.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Sosyal Medya</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li className="active">
              <img src="https://www.yudiz.com/codepen/gsap-slider/han-soo-hee.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Han So-hee</h6>
                <span>Profession:- Actress </span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/go-yoon-jung.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Go Yoon Jung</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/han-hyo-joo.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Han hyo-Joo</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/kim-yoo-jung.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Kim yoo-jung</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/song-hye-kyo.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Song Hye-Kyo</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/seol-in-ah.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Seol in-ah</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
            <li>
              <img src="https://www.yudiz.com/codepen/gsap-slider/kim-sejeong.jpg" alt="images" className="img-fluid" />
              <div className="img-details">
                <h6>Kim sejeong</h6>
                <span>Profession:- Actress</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}


