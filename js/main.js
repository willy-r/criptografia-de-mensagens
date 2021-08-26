const $cryptoTypeInput = document.getElementById('crypto');
const $encodeInput = document.getElementById('encode');
const $decodeInput = document.getElementById('decode');

const $incrementField = document.getElementById('increment-field');
const $formButton = document.getElementById('form-btn');
const $messageTitle = document.getElementById('msg-title');

const $copyButton = document.getElementById('copy-btn');
const $message = document.querySelector('.section__message');
const $copyInfo = document.getElementById('copy-info');

$cryptoTypeInput.addEventListener('change', () => {
  if ($cryptoTypeInput.value === 'base64')
    $incrementField.classList.add('form__field--hide');
  else
    $incrementField.classList.remove('form__field--hide');
});

$encodeInput.addEventListener('change', () => {
  if ($encodeInput.checked) {
    $formButton.textContent = 'Codificar mensagem!';
    $messageTitle.textContent = 'Mensagem codificada:';
  }
});

$decodeInput.addEventListener('change', () => {
  if ($decodeInput.checked) {
    $formButton.textContent = 'Decodificar mensagem!';
    $messageTitle.textContent = 'Mensagem decodificada:';
  }
});

$copyButton.addEventListener('click', () => {
  const textWasSuccessfullyCopied = copyToClipboard($message.innerText);

  if (textWasSuccessfullyCopied) {
    $copyInfo.textContent = 'Copiado!';
  } else {
    $copyInfo.textContent = 'Deu erro!';
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
