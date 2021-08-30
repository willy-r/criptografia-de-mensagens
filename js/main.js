const $cryptoTypeInput = document.getElementById('crypto');
const $encodeInput = document.getElementById('encode');
const $decodeInput = document.getElementById('decode');

const $incrementField = document.getElementById('increment-field');
const $messageWrapper = document.querySelector('.section__wrapper-message');
const $message = document.querySelector('.section__message');
const $copyInfo = document.getElementById('copy-info');
const $messageTitle = document.getElementById('msg-title');
const $yearPlaceholder = document.getElementById('year');

const $copyButton = document.getElementById('copy-btn');
const $formButton = document.getElementById('form-btn');

const $form = document.getElementById('form');

addCurrentYearToFooter();

/** Add current year to footer. */
function addCurrentYearToFooter() {
  $yearPlaceholder.textContent = new Date().getFullYear();
}

// Displays or hides the increment field when the type of the cryptography changes.
$cryptoTypeInput.addEventListener('change', () => {
  if ($cryptoTypeInput.value === 'base64') {
    $incrementField.style.animation = 'fade-out 250ms ease-out';
    setTimeout(() => $incrementField.style.display = 'none', 250);
  } else {
    $incrementField.style.display = 'flex';
    $incrementField.style.animation = 'fade-in 250ms ease-in';
  }
});

// Changes the form button text and the result title when the radio button to encode is checked.
$encodeInput.addEventListener('change', () => {
  if ($encodeInput.checked) {
    $formButton.innerHTML = 'Codificar mensagem <span class="fas fa-lock"></span>';
    $messageTitle.textContent = 'Mensagem codificada:';
  }
});

// Changes the form button text and the result title when the radio button to decode is checked.
$decodeInput.addEventListener('change', () => {
  if ($decodeInput.checked) {
    $formButton.innerHTML = 'Decodificar mensagem <span class="fas fa-lock-open"></span>';
    $messageTitle.textContent = 'Mensagem decodificada:';
  }
});

// Displays an information when the user clicks on the copy button.
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

/**
 * Copy the passed text to clipboard.
 * 
 * @param {string} text The text that will be copied.
 * @returns {boolean} If the text was successfully copied returns true, otherwise false.
 */
function copyToClipboard(text) {
  const $textarea = document.createElement('textarea');
  
  document.body.appendChild($textarea);
  $textarea.innerText = text;
  $textarea.select();
  
  const textWasCopied = document.execCommand('copy');
  document.body.removeChild($textarea);

  return textWasCopied;
}

// Handles the submit on the form.
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

  // Resets the form.
  $incrementField.style.display = 'flex';
  $incrementField.style.animation = 'fade-in 250ms ease-in';
  $formButton.innerHTML = 'Codificar mensagem <span class="fas fa-lock"></span>';
  $messageTitle.textContent = 'Mensagem codificada:';
  $form.reset();
});
