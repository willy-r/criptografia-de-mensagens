const $cryptoTypeInput = document.getElementById('crypto');
const $encodeInput = document.getElementById('encode');
const $decodeInput = document.getElementById('decode');

const $incrementField = document.getElementById('increment-field');
const $formButton = document.getElementById('form-btn');
const $messageTitle = document.getElementById('msg-title');

const $copyButton = document.getElementById('copy-btn');
const $messageWrapper = document.querySelector('.section__wrapper-message');
const $message = document.querySelector('.section__message');
const $copyInfo = document.getElementById('copy-info');

const $form = document.getElementById('form');

addCurrentYearToFooter();

function addCurrentYearToFooter() {
  const $yearPlaceholder = document.getElementById('year');
    
  $yearPlaceholder.textContent = new Date().getFullYear();
}

$cryptoTypeInput.addEventListener('change', () => {
  if ($cryptoTypeInput.value === 'base64') {
    $incrementField.style.animation = 'fade-out 250ms ease-out';
    setTimeout(() => $incrementField.style.display = 'none', 250);
  } else {
    $incrementField.style.display = 'flex';
    $incrementField.style.animation = 'fade-in 250ms ease-in';
  }
});

$encodeInput.addEventListener('change', () => {
  if ($encodeInput.checked) {
    $formButton.innerHTML = 'Codificar mensagem <span class="fas fa-lock"></span>';
    $messageTitle.textContent = 'Mensagem codificada:';
  }
});

$decodeInput.addEventListener('change', () => {
  if ($decodeInput.checked) {
    $formButton.innerHTML = 'Decodificar mensagem <span class="fas fa-lock-open"></span>';
    $messageTitle.textContent = 'Mensagem decodificada:';
  }
});

$copyButton.addEventListener('click', () => {
  const textWasSuccessfullyCopied = copyToClipboard($message.innerText);

  if (textWasSuccessfullyCopied) {
    $copyInfo.textContent = 'Copiado!';
  } else {
    $copyInfo.textContent = 'Deu erro! :(';
  }

  $copyInfo.style.display = 'inline-block';
  setTimeout(() => $copyInfo.style.display = 'none', 2000);
});

function copyToClipboard(text) {
  const $textarea = document.createElement('textarea');
  
  document.body.appendChild($textarea);
  $textarea.innerText = text;
  $textarea.select();
  
  const textWasCopied = document.execCommand('copy');
  document.body.removeChild($textarea);

  return textWasCopied;
}

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData($form);
  const userMessage = data.get('message'),
        cryptoType = data.get('crypto'),
        actionChosen = data.get('action'),
        increment = Number(data.get('increment'));

  let message;
  let msgColor;
  
  if (actionChosen === 'encode') {
    msgColor = 'var(--clr-secondary)';

    if (cryptoType === 'caesar')
      message = caesarCipherEnconder(userMessage, increment);
    else
      message = base64Encoder(userMessage);
  } else {
    msgColor = 'var(--clr-primary)';

    if (cryptoType === 'caesar')
      message = caesarCipherDecoder(userMessage, increment);
    else
      message = base64Decoder(userMessage);
  }

  $message.textContent = message;
  $message.style.color = msgColor;
  $message.style.display = 'block';
  $message.style.animation = 'fade-in 250ms ease-in';
  setTimeout(() => $message.style.animation = 'none', 250);
  
  $copyButton.style.display = 'inline-block';
  $incrementField.style.display = 'flex';
  $incrementField.style.animation = 'fade-in 250ms ease-in';

  $formButton.innerHTML = 'Codificar mensagem <span class="fas fa-lock"></span>';
  $messageTitle.textContent = 'Mensagem codificada:';
  $form.reset();
});
