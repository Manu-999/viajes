const Email = require('../config/mailer');

let message = {
  to: 'manuelbalbas@gmail.com',
  subject: 'Bienvenido',
  template: 'email',
  context: {
    title: 'Bienvenido a mi web de viajes!',
    text: 'Gracias por registrarte en mi web, disfruta del viaje :).'
  }
};

const welcomeEmail = (res) => {
  Email.transporter.sendMail(message, (error, info) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      Email.transporter.close();
      res.status(200).send('Respuesta "%s"' + info.response);
    }
  })
};


module.exports = welcomeEmail;