import nodemailer from 'nodemailer'

type TResetInfo = {
  email: string
  newPassword: string
}

export const sendMail = async (resetInfo: TResetInfo) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'tanvirhcse17@gmail.com',
      pass: 'ylmp vkrn mgwl xwxl',
    },
  })

  const info = await transporter.sendMail({
    from: 'tanvirhcse17@gmail.com', // sender address
    to: resetInfo.email, // list of receivers
    subject: 'Temporary Password', // Subject line
    text: 'hi, User. Temporary Password generated and given below. We suggest you to change your password as soon as possible.', // plain text body
    html: `<div>
        <h2>Temporary login Credential</h2>
        <h3>email: ${resetInfo.email}</h3>
        <h3>Password: ${resetInfo.newPassword}</h3>
    </div>`, // html body
  })

  return info
}
