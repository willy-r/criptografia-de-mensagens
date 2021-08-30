/**
 * Encodes normal text to Base64.
 * 
 * @param {string} normalText The text to encode.
 * @returns {string} The encoded text.
 */
function base64Encoder(normalText) {
  const encondedText = btoa(normalText);

  return encondedText;
}

/**
 * Decodes encoded text in Base64 to normal text.
 * 
 * @param {string} encodedText The encoded text to decode.
 * @returns {string} The decoded text.
 */
function base64Decoder(encodedText) {
  const normalText = atob(encodedText);

  return normalText;
}
