/*singin page */
const byId = (id) => {
    return document.getElementById(id);
};
const $signUpButton = byId('signUp');
const $signInButton = byId('signIn');
const $container = byId('container');

$signUpButton.addEventListener(
    'click',
    () => {
        $container.classList.add('right-panel-active')
    },
);
$signInButton.addEventListener(
    'click',
    () => {
        $container.classList.remove('right-panel-active')
    },
);
/*message page*/
const sendchatBtn = document.querySelector(".chat-input a");
let userMessage;
const handleChat = () => {}
sendchatBtn.addEventListener('click',handleChat);