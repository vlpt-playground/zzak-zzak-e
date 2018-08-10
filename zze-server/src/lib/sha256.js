const crypto = require('crypto');

function sha256(text) {
  const salt = process.env.SHA256_SALT;
  return crypto
    .createHmac('sha256', salt)
    .update(text)
    .digest('hex');
}

module.exports = sha256;
