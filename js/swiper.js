new Swiper('.rated__slider', {
    pagination: {
        el: '.rated-pagination',
        clickable: true,
    },
    spaceBetween: 25,
    autoplay: {
        delay: 4000,
    },
    speed:800,
    lazy:{
        loadOnTransitionStart: false,
        loadPrevNext: false,
    },
    a11y:{
        enabled: true,
    },
    slidesPerView: "auto",
});
new Swiper(".packages__slider_wrapper-mobile", {
    pagination: {
        el: '.packages-pagination',
        clickable: true,
    },
    spaceBetween: 30,
    slidesPerView: 2,
    autoplay: {
        delay: 4000,
    },
    speed:800,
    lazy:{
        loadOnTransitionStart: false,
        loadPrevNext: false,
    },
    a11y:{
        enabled: true,
    },
    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        400:{
            slidesPerView: 1.2
        },
        450:{
            slidesPerView: 1.3
        },
        530:{
            slidesPerView: 1.5,
        },
        580:{
            slidesPerView: 1.7,
        },
        650:{
            slidesPerView: 2,
        },
    }
})
new Swiper('.reviews__wrapper', {
    pagination: {
        el: '.reviews-pagination',
        clickable: true,
    },
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay: {
        delay: 4000,
    },
    speed:800,
    lazy:{
        loadOnTransitionStart: false,
        loadPrevNext: false,
    },
    loop: true,
    a11y:{
        enabled: true,
    },
    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        490:{
            slidesPerView: 1.3
        },
        600:{
            slidesPerView: 1.5,
        },
        650:{
            slidesPerView: 1.7,
        },
        720:{
            slidesPerView: 2,
        },
    }
});