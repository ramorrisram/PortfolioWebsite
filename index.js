const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
      <h3>Contact Details</h3>
      <ul
        <li>Name: ${req.body.name}</li>
        <li>Meail: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
     `

     let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
        user: 'brok3ndata@gmail.com',
        pass: 'Pleasant2017'
    }
});

     let mailOptions ={
       from: 'test@testaccount.com',
       to: 'brok3nData@gmail.com',
       replyTo: 'test@testaccount',
       subject: 'New Message',
       text: req.body.message,
       html: htmlEmail
     }

     transporter.sendMail(mailOptions, (err, info) => {
       if(err) {
         return console.log(err)
       }

      console.log('Message Sent: %s', info.message)
      console.log('Message URL: %s', nodemailer.getTestMessageURL(info))
    })
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Server listening on port ${PORT}')
})
