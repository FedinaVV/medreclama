/**
 * Mask for phone number input
 */
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.form__input-phone'), function(input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5)  this.value = ""
        }
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });
});

/**
 * Slider swiper
 */

new Swiper('.swiper', {
    slidesPerView: 2,
    spaceBetween: -40,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints:{
        320: {
            slidesPerView: 1
        },
        767: {
            slidesPerView: 2
        }
    },
});

/**
 * Swap
 */

document.querySelectorAll('.drop').forEach(e => {
    e.draggable = true;
    e.ondragstart = e => {
        e.dataTransfer.setData("id", e.target.id);
        e.target.classList.add('dragging');
    }
    e.ondragover = e => {
        let old = document.querySelector('.over');
        old && old.classList.remove('over')
        e.target.classList.add('over');
        e.preventDefault();
    };
    e.ondrop = e => {
        let old = document.querySelector('.dragging');
        old && old.classList.remove('dragging')
        old = document.querySelector('.over');
        old && old.classList.remove('over');
        let v = e.target.innerHTML;
        let fromEl = document.querySelector('#'+e.dataTransfer.getData('id'));
        e.target.innerHTML = fromEl.innerHTML;
        fromEl.innerHTML = v;

    };
})