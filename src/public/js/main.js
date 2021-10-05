var slideIndex;

function showSlides() {
    var i;
    var slides = document.getElementsByClassName('mySlides');
    var dots = document.getElementsByClassName('dot');
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }

    slides[slideIndex].style.display = 'flex';
    dots[slideIndex].className += ' active';
    //chuyển đến slide tiếp theo
    slideIndex++;
    //nếu đang ở slide cuối cùng thì chuyển về slide đầu
    if (slideIndex > slides.length - 1) {
        slideIndex = 0;
    }
    //tự động chuyển đổi slide sau 5s
    setTimeout(showSlides, 5000);
}
//mặc định hiển thị slide đầu tiên
showSlides((slideIndex = 0));

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function handleScroll() {
    var turnUpBtn = document.querySelector('.turn__up');
    window.addEventListener('scroll', function () {
        var x = window.pageYOffset;
        console.log(turnUpBtn);
        if (x > 300) {
            turnUpBtn.classList.add('turn__up--active');
        } else {
            turnUpBtn.classList.remove('turn__up--active');
        }
    });
}

handleScroll();
