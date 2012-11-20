module.exports.email = {
  host: "smtp.gmail.com",
  port: 465,
  ssl: true,
  use_authentication: true,
  user: process.env.SETTINGS_EMAIL,
  pass: process.env.SETTINGS_PASSWORD
};

