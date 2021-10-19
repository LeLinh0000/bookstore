// var slideIndex;

// function showSlides() {
//     var i;
//     var slides = document.getElementsByClassName('mySlides');
//     var dots = document.getElementsByClassName('dot');
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = 'none';
//     }
//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(' active', '');
//     }

//     slides[slideIndex].style.display = 'flex';
//     dots[slideIndex].className += ' active';
//     //chuyển đến slide tiếp theo
//     slideIndex++;
//     //nếu đang ở slide cuối cùng thì chuyển về slide đầu
//     if (slideIndex > slides.length - 1) {
//         slideIndex = 0;
//     }
//     //tự động chuyển đổi slide sau 5s
//     setTimeout(showSlides, 5000);
// }
// //mặc định hiển thị slide đầu tiên
// showSlides((slideIndex = 0));

// function currentSlide(n) {
//     showSlides((slideIndex = n));
// }

// function handleScroll() {
//     var turnUpBtn = document.querySelector('.turn__up');
//     window.addEventListener('scroll', function () {
//         var x = window.pageYOffset;
//         if (x > 300) {
//             turnUpBtn.classList.add('turn__up--active');
//         } else {
//             turnUpBtn.classList.remove('turn__up--active');
//         }
//     });
// }

// handleScroll();

// Auth
// var register = document.querySelector('#register-btn');
// var login = document.querySelector('#login-btn');

// console.log(login);
// // document.querySelector(".modal").style.display = "flex";

// login.onclick = function () {
//     console.log('Show login');
//     document.querySelector('.modal').style.display = 'flex';
//     document.querySelector('#register-form').style.display = 'none';
// };

// Validate
