import '../styles/style.scss';
import { validateMail } from './modules/validators';
import { getMailInputNode, showMailInputMessage, hideMailInputMessage } from './modules/mailInput';
import Swiper, { Pagination } from 'swiper';

const checkValidMail = () => {

    //get all mail forms
    const mailForms = document.getElementsByClassName("mailForm");

    for (const form of mailForms) {

        //add event for mail form
        form.addEventListener('submit', (event) => {

            event.preventDefault();

            const [input, sendButton, messageBlock] = getMailInputNode(form);

            //check valid value of input
            const isValid = validateMail(input.value);

            if (!isValid) {

                //show error message
                showMailInputMessage(input, sendButton, messageBlock, 'Неверный формат почты');


                setTimeout(() => {

                    //hide error message
                    hideMailInputMessage(input, sendButton, messageBlock)

                    //focus on input
                    if (input) input.focus();
                }, 2000)

                return;
            }

            //show success message on all mail forms
            showMailInputMessage(input, sendButton, messageBlock, 'Проверьте e-mail!');

            // for (const form of mailForms) {

            //     const [input,sendButton,messageBlock] = getMailInputNode(form);
            //     showMailInputMessage(input, sendButton, messageBlock, 'Проверьте e-mail!')

            // }

        })
    }
}

const initHeaderButton = () => {

    //get button in header for toggle modal window
    const headerButton = document.getElementById('headerButton');

    //get modal window
    const headerModal = document.getElementById('headerModal');

    if (!headerButton || !headerModal) return;

    headerButton.addEventListener('click', () => {

        //hide and show modal window
        headerModal.classList.toggle('modalHeader_visible');
        
        document.body.classList.toggle('hideScroll');
    })

}

const initAnchors = () => {

    //get all anchors
    const anchors = document.getElementsByClassName('linksList__link');

    //get modal window
    const headerModal = document.getElementById('headerModal');

    for (const anchor of anchors) {

        //add click event for all anchors
        anchor.addEventListener('click', (e) => {

            //shop refresh page
            e.preventDefault();

            //get href of anchor
            const href = anchor.getAttribute('href');

            if (!href) return;

            //get offset of top for scroll to position
            const findedAnchorPosition = document.getElementById(href).offsetTop;

            //scroll to position
            window.scrollTo({
                top: findedAnchorPosition - 150,
                behavior: 'smooth'
            })

            //hide modal window
            if (headerModal) headerModal.classList.remove('modalHeader_visible');
            document.body.classList.remove('hideScroll');

        })

    }

}

const initFooterForm = () => {

    const footerForm = document.getElementById('startForm');

    if (!footerForm) return;

    const successMessage = document.getElementById('startFormSuccess');

    footerForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const sendMailInput = document.getElementById('sendMailInput');

        const inputMessageBlock = document.getElementById('sendMailInputMessage');

        if (!sendMailInput) return;

        if (!validateMail(sendMailInput.value)) {

            //set error message
            showMailInputMessage(sendMailInput, null, inputMessageBlock, 'Неверный формат почты');

            setTimeout(() => {

                //hide error message
                hideMailInputMessage(sendMailInput, null, inputMessageBlock);

                //focus on input
                inputMessageBlock.focus();
            }, 2000)

            return;

        }

        footerForm.classList.add('footer__form_hide');

        successMessage.classList.add('footer__successMessage_visible');

    })

}

document.addEventListener("DOMContentLoaded", function () {

    //init swiper
    const swiper = new Swiper('.shortSwiper', {
        modules: [Pagination],
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 40,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });

    const casesSwiper = new Swiper('.casesSwiper', {
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    })

    checkValidMail();

    initHeaderButton();

    initAnchors();

    initFooterForm();
})