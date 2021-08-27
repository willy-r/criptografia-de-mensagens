function base64Encoder(normalText) {
  const encondedText = btoa(normalText);

  return encondedText;
}

function base64Decoder(encodedText) {
  const normalText = atob(encodedText);

  return normalText;
}
