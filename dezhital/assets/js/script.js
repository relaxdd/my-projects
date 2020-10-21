class Slider {
  constructor(options) {
    // Основные параметры
    this.container = options.container;
    this.slides = options.slides;
    this.autorun = options.autorun || false;

    if (this.autorun) {
      this.slideInterval = options.slideInterval;
    }

    this.slideCount = this.slides.length;
    this.slideNow = 1;
    this.navBtnId = 0;
    this.translateWidth = 0; // Стилистические настройкиж

    this.bottomNav = options.bottomNav || false;
    this.containerWidth = options.containerWidth || '100%';
    this.sliderTransition = options.sliderTransition || 'cubic-bezier';
    this.sliderNavTheme = options.sliderNavTheme || "white"; // Рендер слайдера

    this.render(); // Запуск слайдера

    setTimeout(() => {
      this.start();
    }, 500);
  }

  render() {
    if ($(this.container).children('.slider_container').length == 0) {
      let insertSlides = '',
          viewPort = '',
          navsBtnWrapper = '',
          navsBtn = '',
          sliderId = 0;

      for (let i = 0; i < this.slideCount; i++) {
        insertSlides += `
            <li class="slide" style="width: calc(100% / ${this.slideCount})">
                <img src="${this.slides[i]}" alt="${i}" class="slide-img">
            </li>`;
        navsBtn += `
            <li class="slide-nav-btn">
                <div class="slide-nav-btn__point"></div>
            </li>`;
      }

      if (this.bottomNav) {
        navsBtnWrapper = `
                <ul class="nav-btns ${this.sliderNavTheme}">
                    ${navsBtn}
                </ul>`;
      }

      viewPort = `
        <div class="slider_container" style="width: ${this.containerWidth}">
            <div class="viewport">
                <ul class="slider_wrapper ${this.sliderTransition}" style="width: calc(100% * ${this.slideCount});">
                    ${insertSlides}
                </ul>
                <div class="prev-next-btns ${this.sliderNavTheme}">
                    <div class="prev-btn">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </div>
                    <div class="next-btn">
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div>
                ${navsBtnWrapper}
            </div>
        </div>`;
      $(this.container).append(viewPort);
      sliderId += sliderId;
    }
  }

  start() {
    for (let i = 0; i < $(this.container).find('.slider_container').length; i++) {
      if (this.bottomNav) {
        $(this.container).find('.slider_container').eq(i).find('.slide-nav-btn').eq(this.navBtnId).addClass('active');
      }

      ;
    }

    if (this.autorun) {
      let switchInterval;
      switchInterval = setInterval(() => {
        this.nextSlide();
      }, this.slideInterval);
      $(this.container).find('.viewport').hover(() => {
        clearInterval(switchInterval);
      }, () => {
        switchInterval = setInterval(() => {
          this.nextSlide();
        }, this.slideInterval);
      });
    }

    $(this.container).find('.next-btn').on('click', () => {
      this.nextSlide();
    });
    $(this.container).find('.prev-btn').on('click', () => {
      this.prevSlide();
    });

    if (this.bottomNav) {
      $(this.container).find('.slide-nav-btn').click(e => {
        this.navBtnId = $(e.target).index();

        if (this.navBtnId + 1 != this.slideNow) {
          this.translateWidth = -$(this.container).find('.viewport').width() * this.navBtnId;
          $(this.container).find('.slider_wrapper').css({
            'transform': 'translate(' + this.translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + this.translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + this.translateWidth + 'px, 0)'
          });
          this.slideNow = this.navBtnId + 1;
        }

        this.clearSliderBtn();

        if (!$(this.container).find('.slide-nav-btn').eq(this.navBtnId).hasClass('active')) {
          this.clearSliderBtn;
          $(this.container).find('.slide-nav-btn').eq(this.navBtnId--).addClass('active');
        }
      });
    }
  }

  clearSliderBtn() {
    for (var i = 0; i < $(this.container).find('.slide-nav-btn').length; i++) {
      $(this.container).find('.slide-nav-btn').eq(i).removeClass('active');
    }
  }

  nextSlide() {
    if (this.slideNow == this.slideCount || this.slideNow <= 0 || this.slideNow > this.slideCount) {
      $(this.container).find('.slider_wrapper').css('transform', 'translate(0, 0)');

      if (this.bottomNav) {
        this.clearSliderBtn();
      }

      if (this.bottomNav) {
        $(this.container).find('.slide-nav-btn').eq(0).addClass('active');
      }

      this.slideNow = 1;
      let slideNowId = this.slideNow;
    } else {
      this.translateWidth = -$(this.container).find('.viewport').width() * this.slideNow;
      $(this.container).find('.slider_wrapper').css({
        'transform': 'translate(' + this.translateWidth + 'px, 0)',
        '-webkit-transform': 'translate(' + this.translateWidth + 'px, 0)',
        '-ms-transform': 'translate(' + this.translateWidth + 'px, 0)'
      });

      if (this.bottomNav) {
        this.clearSliderBtn();
      }

      this.slideNow++;

      if (this.bottomNav) {
        $(this.container).find('.slide-nav-btn').eq(this.slideNow - 1).addClass('active');
      }
    }
  }

  prevSlide() {
    if (this.slideNow == 1 || this.slideNow <= 0 || this.slideNow > this.slideCount) {
      this.translateWidth = -$(this.container).find('.viewport').width() * (this.slideCount - 1);
      $(this.container).find('.slider_wrapper').css({
        'transform': 'translate(' + this.translateWidth + 'px, 0)',
        '-webkit-transform': 'translate(' + this.translateWidth + 'px, 0)',
        '-ms-transform': 'translate(' + this.translateWidth + 'px, 0)'
      });

      if (this.bottomNav) {
        this.clearSliderBtn();
      }

      if (this.bottomNav) {
        $(this.container).find('.slide-nav-btn').eq(this.slides.length - 1).addClass('active');
      }

      this.slideNow = this.slideCount;
    } else {
      this.translateWidth = -$(this.container).find('.viewport').width() * (this.slideNow - 2);
      $(this.container).find('.slider_wrapper').css({
        'transform': 'translate(' + this.translateWidth + 'px, 0)',
        '-webkit-transform': 'translate(' + this.translateWidth + 'px, 0)',
        '-ms-transform': 'translate(' + this.translateWidth + 'px, 0)'
      });

      if (this.bottomNav) {
        this.clearSliderBtn();
      }

      if (this.bottomNav) {
        $(this.container).find('.slide-nav-btn').eq(this.slideNow - 2).addClass('active');
      }

      this.slideNow--;
    }
  }

}

;

class Gallery {
  constructor(options) {
    this.container = options.container;
    this.label = options.label;
    this.images = options.images;
    this.folder = options.folder;

    if (this.images == undefined) {
      this.countLoremItem = options.countLoremItem;
    }

    this.imageCountAtLine = options.imageCountAtLine || 3;

    if (this.imageCountAtLine == 4) {
      this.maxImageOnLoad = 16;
    } else if (this.imageCountAtLine == 3) {
      this.maxImageOnLoad = 15;
    }

    this.countLoaded = 2;
    this.countNewLoad = 1;
    this.render();
    this.loadYetBtn();
  }

  render() {
    let galleryItem = '',
        imagesAlt = 1;
    $(this.container).addClass(`column-${this.imageCountAtLine}`);

    if (this.images == undefined) {
      for (let i = 0; i < this.countLoremItem; i++) {
        galleryItem += `
				<div class="gallery__item">
					<a href="${this.folder}" target="_blank">
						<img src="${this.folder}" alt="lorem-${imagesAlt}">
					</a>
				</div>`;
        imagesAlt++;
      }

      $(this.container).append(galleryItem);
    } else {
      if (this.images.length > this.maxImageOnLoad) {
        let loadYet = `
					<div class="load_img_yet">
						<p id="load-btn">Загрузить еще...</p>
					</div>`;

        for (let i = 0; i < this.maxImageOnLoad; i++) {
          galleryItem += `
					<div class="gallery__item">
						<a href="${this.folder}${this.images[i]}" target="_blank">
							<img src="${this.folder}${this.images[i]}" alt="img-${imagesAlt}">
						</a>
					</div>`;
          imagesAlt++;
        }

        $(this.container).append(galleryItem);
        $(this.container).append(loadYet);
      } else {
        for (let i = 0; i < this.images.length; i++) {
          galleryItem += `
					<div class="gallery__item">
						<a href="${this.folder}${this.images[i]}" target="_blank">
							<img src="${this.folder}${this.images[i]}" alt="img-${imagesAlt}">
						</a>
					</div>`;
          imagesAlt++;
        }

        $(this.container).append(galleryItem);
      }
    }
  }

  loadYetBtn() {
    $(this.container).find('#load-btn').on('click', () => {
      this.newLoadImg();
    });
  }

  newLoadImg() {
    let remainsImg = this.images.length - this.maxImageOnLoad * this.countNewLoad,
        newStartImg = this.maxImageOnLoad * this.countNewLoad,
        galleryItem = '',
        endImgLoad;

    if (remainsImg > this.maxImageOnLoad) {
      endImgLoad = this.maxImageOnLoad * this.countLoaded;

      for (let i = newStartImg; i < endImgLoad; i++) {
        galleryItem += `
				<div class="gallery__item">
					<a href="${this.folder}${this.images[i]}" target="_blank">
						<img src="${this.folder}${this.images[i]}" alt="img-${i + 1}">
					</a>
				</div>`;
      }

      $(this.container).append(galleryItem);
      $(this.container).find('.load_img_yet').appendTo(this.container);
    } else {
      console.log('end');
      endImgLoad = this.images.length;
      $(this.container).find('.load_img_yet').remove();

      for (let i = newStartImg; i < endImgLoad; i++) {
        galleryItem += `
				<div class="gallery__item">
					<a href="${this.folder}${this.images[i]}" target="_blank">
						<img src="${this.folder}${this.images[i]}" alt="img-${i + 1}">
					</a>
				</div>`;
      }

      $(this.container).append(galleryItem);
    }

    this.countLoaded++;
    this.countNewLoad++;
  }

}

;
$(function () {
  let headerSticky = true;

  if (headerSticky && screen.width < 992) {
    function fixDiv() {
      let $cache = $('#sticky');
      if ($(window).scrollTop() > 0) $cache.addClass('sticked');else $cache.removeClass('sticked');
    }

    $(window).scroll(fixDiv);
    fixDiv();
  }

  const slider = new Slider({
    container: '#block-for-slider',
    slides: ['img/1-Block/1.jpg', 'img/1-Block/2.jpg', 'img/1-Block/3.jpg', 'img/1-Block/4.jpg', 'img/1-Block/5.jpg', 'img/1-Block/6.jpg'],
    autorun: true,
    slideInterval: 7000,
    bottomNav: true,
    containerWidth: '85%'
  });
  const slider_product_1 = new Slider({
    container: '.img-slider-1',
    slides: ['img/marble/10.jpg', 'img/marble/11.jpg', 'img/marble/12.jpg', 'img/marble/13.jpg', 'img/marble/14.jpg', 'img/marble/15.jpg', 'img/marble/25.jpg', 'img/marble/26.jpg', 'img/marble/27.jpg', 'img/marble/31-2.jpg', 'img/marble/32.jpg', 'img/marble/32-3.jpg', 'img/marble/34.jpg', 'img/marble/35.jpg', 'img/marble/36.jpg', 'img/marble/37.jpg', 'img/marble/38.jpg', 'img/marble/39.jpg'],
    autorun: false,
    bottomNav: false,
    sliderNavTheme: "dark",
    sliderTransition: 'linear'
  });
  const slider_product_2 = new Slider({
    container: '.img-slider-2',
    slides: ['img/marble/28.jpg', 'img/marble/30.jpg', 'img/marble/31.jpg', 'img/marble/32.jpg', 'img/marble/33-2.jpg', 'img/marble/34-2.jpg', 'img/marble/35-2.jpg', 'img/marble/40.jpg', 'img/marble/82.jpg'],
    autorun: false,
    bottomNav: false,
    sliderNavTheme: "dark",
    sliderTransition: 'linear'
  });
  const slider_product_3 = new Slider({
    container: '.img-slider-3',
    slides: ['img/marble/51.jpg', 'img/marble/81.jpg', 'img/marble/82-2.jpg'],
    autorun: false,
    bottomNav: false,
    sliderNavTheme: "dark",
    sliderTransition: 'linear'
  });
  const slider_granite_1 = new Slider({
    container: '.img-granite-1',
    slides: ['img/granite/1.jpg', 'img/granite/2.jpg', 'img/granite/3.jpg', 'img/granite/4.jpg', 'img/granite/5.jpg', 'img/granite/6.jpg', 'img/granite/7.jpg', 'img/granite/8.jpg', 'img/granite/9.jpg', 'img/granite/36.jpg', 'img/granite/57.jpg'],
    autorun: false,
    bottomNav: false,
    sliderNavTheme: "white",
    sliderTransition: 'linear'
  });
  const slider_granite_2 = new Slider({
    container: '.img-granite-2',
    slides: ['img/granite/13.jpg', 'img/granite/16.jpg', 'img/granite/28.jpg', 'img/granite/31.jpg', 'img/granite/33.jpg', 'img/granite/37.jpg', 'img/granite/46.jpg', 'img/granite/48.jpg', 'img/granite/50.jpg'],
    autorun: false,
    bottomNav: false,
    sliderNavTheme: "white",
    sliderTransition: 'linear'
  });
  const slider_granite_3 = new Slider({
    container: '.img-granite-3',
    slides: ['img/granite/10.jpg', 'img/granite/10.jpg', 'img/granite/15.jpg', 'img/granite/17.jpg', 'img/granite/18.jpg', 'img/granite/19.jpg', 'img/granite/22.jpg', 'img/granite/23.jpg', 'img/granite/24.jpg', 'img/granite/25.jpg', 'img/granite/26.jpg', 'img/granite/27.jpg', 'img/granite/31.jpg', 'img/granite/32.jpg', 'img/granite/33.jpg', 'img/granite/35.jpg', 'img/granite/39.jpg', 'img/granite/40.jpg', 'img/granite/49.jpg'],
    autorun: false,
    bottomNav: false,
    sliderNavTheme: "white",
    sliderTransition: 'linear'
  });
  const slider_granite_4 = new Slider({
    container: '.img-granite-4',
    slides: ['img/granite/11.jpg', 'img/granite/12.jpg', 'img/granite/13.jpg', 'img/granite/14.jpg', 'img/granite/20.jpg', 'img/granite/21.jpg', 'img/granite/29.jpg', 'img/granite/30.jpg', 'img/granite/34.jpg', 'img/granite/38.jpg', 'img/granite/41.jpg', 'img/granite/42.jpg', 'img/granite/43.jpg', 'img/granite/44.jpg', 'img/granite/45.jpg', 'img/granite/47.jpg', 'img/granite/51.jpg', 'img/granite/57.jpg', 'img/granite/58.jpg'],
    autorun: false,
    bottomNav: false,
    sliderNavTheme: "white",
    sliderTransition: 'linear'
  });
  const slider_photo_ceramic_1 = new Slider({
    container: '.img-photo-ceramic-1',
    slides: ['img/photo-ceramic/1.jpg', 'img/photo-ceramic/2.jpg', 'img/photo-ceramic/3.jpg', 'img/photo-ceramic/14.jpg'],
    autorun: false,
    bottomNav: false,
    sliderNavTheme: "white",
    sliderTransition: 'linear'
  });
  const slider_photo_ceramic_2 = new Slider({
    container: '.img-photo-ceramic-2',
    slides: ['img/photo-ceramic/4.jpg', 'img/photo-ceramic/7.jpg', 'img/photo-ceramic/4.jpg'],
    autorun: false,
    bottomNav: false,
    sliderNavTheme: "dark",
    sliderTransition: 'linear'
  });
  const slider_photo_ceramic_3 = new Slider({
    container: '.img-photo-ceramic-3',
    slides: ['img/photo-ceramic/5.jpg', 'img/photo-ceramic/6.jpg', 'img/photo-ceramic/8.jpg', 'img/photo-ceramic/9.jpg', 'img/photo-ceramic/10.jpg', 'img/photo-ceramic/11.jpg', 'img/photo-ceramic/12.jpg', 'img/photo-ceramic/13.jpg'],
    autorun: false,
    bottomNav: false,
    sliderNavTheme: "dark",
    sliderTransition: 'linear'
  }); // Галерея

  const galleryCarvedIcons = new Gallery({
    container: '.carved-icons',
    label: 'carved-icons',
    folder: 'img/gallery/1/',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
    imageCountAtLine: 3
  });
  const galleryFences = new Gallery({
    container: '.wrapper-fences',
    label: 'fences',
    folder: 'img/fences/',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg', '40.jpg', '41.jpg', '42.jpg', '43.jpg', '44.jpg', '45.jpg', '46.jpg', '47.jpg', '48.jpg', '49.jpg', '50.jpg', '51.jpg', '52.jpg', '53.jpg', '54.jpg', '55.jpg', '56.jpg', '57.jpg', '58.jpg', '59.jpg', '60.jpg', '61.jpg', '62.jpg', '63.jpg', '64.jpg', '65.jpg', '66.jpg', '67.jpg', '68.jpg', '69.jpg', '70.jpg', '71.jpg', '72.jpg', '73.jpg', '74.jpg', '75.jpg', '76.jpg', '77.jpg', '78.jpg', '79.jpg', '80.jpg', '81.jpg', '82.jpg', '83.jpg', '84.jpg', '85.jpg', '86.jpg', '87.jpg', '88.jpg', '89.jpg', '90.jpg', '91.jpg', '92.jpg', '93.jpg', '94.jpg', '95.jpg', '96.jpg', '97.jpg', '98.jpg', '99.jpg', '100.jpg', '101.jpg', '102.jpg', '103.jpg', '104.jpg', '105.jpg', '106.jpg', '107.jpg', '108.jpg', '109.jpg', '110.jpg', '111.jpg', '112.jpg', '113.jpg', '114.jpg'],
    imageCountAtLine: 4
  }); // Даю нужным элементам в галерее клас active

  $('gallery_tabs__item').eq(0).addClass('active');
  $('.wrapper_inner').eq(0).addClass('active'); // Даю контактной форме класс active

  $('footer_block__title').eq(2).addClass('active'); // Если был клику по тайтлу в галерее

  $('.gallery_tabs__item').click(e => {
    const ind = $(e.target).index();

    for (var i = 0; i < $('.gallery_tabs__item').length; i++) {
      $('.gallery_tabs__item').eq(i).removeClass('active');
      $('.wrapper_inner').eq(i).removeClass('active');
    }

    $('.gallery_tabs__item').eq(ind).addClass('active');
    $('.wrapper_inner').eq(ind).addClass('active');
  }); // Если был клик по тайтлу в подвале

  if (screen.width < 768) {
    let footerBlockHeightStart = 0; // Даю контактной форме высоту

    for (let i = 0; i < $('.footer_block__body').eq(2).children().length; i++) {
      footerBlockHeightStart += parseInt($('.footer_block__body').eq(2).children().eq(i).css('height'));
    }

    $('.footer_block__body').eq(2).css('max-height', footerBlockHeightStart + 'px');
    $('.footer_block__title').click(e => {
      let prnt = $(e.target).parent(),
          ind = $(prnt).index(),
          footerBlockHeight = 0;

      for (let i = 0; i < $('.footer_block__title').length; i++) {
        $('.footer_block__body').eq(i).css('max-height', '0px');
        $('.footer_block__title').eq(i).removeClass('active');
      }

      for (let i = 0; i < $('.footer_block__body').eq(ind).children().length; i++) {
        footerBlockHeight += parseInt($('.footer_block__body').eq(ind).children().eq(i).css('height'));
      }

      $('.footer_block__body').eq(ind).css('max-height', footerBlockHeight + 'px');
      $('.footer_block__title').eq(ind).addClass('active');
    });
  }

  $('.open-modal').click(e => {
    let reasonsModal = $(e.target).attr('data-reason');
    $('#popup-form-modal').modal('show');
    $('#popup-form-modal').find('#reason-modal').val(reasonsModal);
  });

  if (screen.width < 992) {
    // Мобильное меню
    $('.mobile-toggler').click(() => {
      $('.header-nav').toggleClass('active');
    });
    $('a[href *= \\#]').click(e => {
      if (location.pathname.replace(/^\//, '') == e.target.pathname.replace(/^\//, '') && location.hostname == e.target.hostname) {
        let $target = $(e.target.hash);
        $target = $target.length && $target || $('[name=' + e.target.hash.slice(1) + ']');

        if ($target.length) {
          let targetOffset = $target.offset().top - $(".header-content").outerHeight(true);
          $('html,body').animate({
            scrollTop: targetOffset
          }, 1000);
          return false;
        }
      }
    });
  } else {
    $("a[href^=\\#]").click(function () {
      let _href = $(this).attr("href");

      $("html, body").animate({
        scrollTop: $(_href).offset().top + "px"
      }, 750);
      return false;
    });
  }
});
$(function () {
  countSendler = 0;
  $('form').on('submit', e => {
    e.preventDefault();

    if (countSendler >= 5) {
      alert('Вы отправили заявку слишком много раз!');

      for (let i = 0; i < $('form').length; i++) {
        $('form')[i].reset();
      }
    } else {
      for (let i = 0; i < $('form').length; i++) {
        if (!$(e.target).is($('form').eq(i))) {
          $('form')[i].reset();
        } else {
          countForm = i;
        }
      } // function sendDataAjax() {


      let formData = $(e.target).serialize();
      $.ajax({
        url: 'assets/php/mail.php',
        method: 'POST',
        data: formData,
        beforeSend: () => {
          $(e.target).find('button').attr('disabled', 'disabled');
          $(e.target).find('button').addClass('disabled');
          $('body').addClass('wait');
        },
        success: data => {
          console.log(data);
          $('form')[countForm].reset();
          $(e.target).find('button').removeAttr('disabled');
          $(e.target).find('button').removeClass('disabled');
          $('body').removeClass('wait');
          $('#popup-form-modal').modal('hide');
          setTimeout(() => {
            alert('Мы получили ваше сообщение и скоро перезвоним вам!');
          }, 200);
          countSendler++;
        },
        error: function (jqXHR, exception) {
          $(e.target).find('button').removeAttr('disabled');
          $(e.target).find('button').removeClass('disabled');
          $('body').removeClass('wait');
          $('#popup-form-modal').removeClass('wait');

          if (jqXHR.status === 0) {
            alert('Нет соединения с интернетом, проверьте подключение');
          } else if (jqXHR.status == 404) {
            alert('Requested page not found 404.');
          } else if (jqXHR.status == 500) {
            alert('Internal Server Error 500.');
          } else if (exception === 'parsererror') {
            alert('Requested JSON parse failed.');
          } else if (exception === 'timeout') {
            alert('Time out error.');
          } else if (exception === 'abort') {
            alert('Ajax request aborted.');
          } else {
            alert(`Uncaught Error. ${jqXHR.responseText}`);
          }
        }
      }); // }
    }
  });
  $('input[type=tel]').on('input', function () {
    if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
      this.value = this.value.replace(/[^0-9\.]/g, '');
    }

    return false;
  });
});
;