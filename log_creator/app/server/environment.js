require('dotenv').config()
module.exports = {
  webapp: {
    port: process.env.PORT,
    send_to_url: process.env.SEND_TO_URL,
    logging_url: process.env.LOGGING_URL
  }
}
