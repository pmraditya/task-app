const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API)

const sendWelcomeMessage = (email,name)=>{

    sgMail.send({
        to: email,
      from: 'pmradityaair1@gmail.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: `Hi ${name}, welcome to my, you will enjoy here a lot`
    })

}

const deleteMessage = (email,name)=>{
    sgMail.send({
        to:email,
        from:'pmradityaair1@gmail.com',
        subject:'regarding removing a user',
        text:`Hi ${name}, see you soon`
    })
}

module.exports = {
    sendWelcomeMessage,
    deleteMessage
}
