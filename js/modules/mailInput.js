const getMailInputNode = (form) => {
    //get mail input
    const [input] = form.getElementsByClassName('inputBlock__input');

    //get send button of form
    const [sendButton] = form.getElementsByClassName('button');

    //get block for message
    const [messageBlock] = form.getElementsByClassName('inputBlock__sendMessage');

    return [input, sendButton, messageBlock];
}

const showMailInputMessage = (input, sendButton, messageBlock, message) => {

    if (messageBlock) {
        //set error message
        messageBlock.textContent = message;

        //show error message
        messageBlock.classList.add('inputBlock__sendMessage_visible');
    }

    //disable form
    if (input) input.setAttribute('disabled', '');
    if (sendButton) sendButton.setAttribute('disabled', '');
}

const hideMailInputMessage = (input, sendButton, messageBlock) => {
    //hide error message
    if (messageBlock) messageBlock.classList.remove('inputBlock__sendMessage_visible');

    //enable form
    if (input) input.removeAttribute('disabled');
    if (sendButton) sendButton.removeAttribute('disabled');
}

export {
    getMailInputNode,
    showMailInputMessage,
    hideMailInputMessage
}