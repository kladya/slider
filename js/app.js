'use strict';

import pictures from './module.js';

const sliderBox = document.querySelector('.slider-box');
const dots = document.querySelector('.dots');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let index = 0;
let auto = true;

sliderAutomatic(3000, 77);

function sliderAutomatic(frequency, sliderHeight) {

    let timer = frequency + 1000;
    loadPictures();
    const slider = document.querySelectorAll('.slider');
    showDots();
    const dot = document.querySelectorAll('.dot');
    showPictureAutoFirst();
    const showAuto = setInterval(showPictureAuto, frequency);

    setInterval(() => {
        if (!auto) {
            timer += 1000;
            showPictureAuto();
        }
    }, frequency);

    prev.addEventListener('click', () => {
        auto = false;
        timer = 0;
        clearInterval(showAuto);
        showPicture(index - 1);
    });

    next.addEventListener('click', () => {
        auto = false;
        timer = 0;
        clearInterval(showAuto);
        showPicture(index + 1);
    });

    for (let i = 0; i < pictures.length; i++) {
        dot[i].addEventListener('click', () => {
            auto = false;
            timer = 0;
            clearInterval(showAuto);
            showPicture(i);
        });
    }

    function showDots() {
        for (let i = 0; i < pictures.length; i++) {
            const dotElement = document.createElement('span');
            dotElement.classList.add('dot');
            dots.prepend(dotElement);
        }
    }

    function showPicture(i) {
        dot[index].classList.remove('dot-showed');
        slider[index].classList.remove('show');
        slider[index].classList.add('hide');
        if (i >= pictures.length) i = 0;
        if (i < 0) i = pictures.length - 1;
        slider[i].classList.remove('hide');
        slider[i].classList.add('show');
        dot[i].classList.add('dot-showed');
        index = i;
    }

    function showPictureAuto() {
        if (timer > frequency) {
            dot[index].classList.remove('dot-showed');
            slider[index].classList.remove('show')
            slider[index].classList.add('hide');
            index++;
            if (index >= pictures.length) index = 0;
            slider[index].classList.remove('hide');
            slider[index].classList.add('show');
            dot[index].classList.add('dot-showed');
        }
    }

    function showPictureAutoFirst() {
        slider[index].classList.remove('hide');
        slider[index].classList.add('show');
        dot[index].classList.add('dot-showed');
    }

    function loadPictures() {
        for (let i = 0; i < pictures.length; i++) {
            const sliderElement = document.createElement('div');
            sliderElement.classList.add('slider', 'hide');
            sliderElement.style.height = `${sliderHeight}vh`;
            sliderElement.innerHTML = `
                <div class="count">${i + 1} / ${pictures.length}</div>
                <img src=${pictures[i].url} alt=${pictures[i].alt}>
                <div class="caption">${pictures[i].caption}</div>
            `;
            sliderBox.append(sliderElement);
        }
    }
}