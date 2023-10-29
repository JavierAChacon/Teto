import nodemailer from 'nodemailer'

export const registerEmail = async data => {
  const { email, name, token } = data
  //TODO: Mover hacia variables de entorno
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const info = await transport.sendMail({
    from: '"Teto" <accounts@teto.com>',
    to: email,
    subject: 'Confirmation instructions for Teto account',
    text: 'Confirm your account on Teto',
    html: `<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
    <div style="background-color: #007bff; color: #ffffff; padding: 10px 0; border-top-left-radius: 10px; border-top-right-radius: 10px; font-family: Arial, sans-serif;">
        <h1>Account Verification at Teto</h1>
    </div>
    <p>Dear ${name},</p>
    <p>Thank for registering at Teto. To complete the registration process and verify your account, please click on the following link:</p>
    <a href=${process.env.FRONTEND_URL}/confirm/${token} style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; margin-top: 20px; border-radius: 5px;">Verify My Account</a>
    <p>If you did not request this verification, please ignore this email.</p>
    <p>Best regards,<br>The Teto Team</p>
</div>
    `
  })
}

export const forgotPasswordEmail = async data => {
  const { email, name, token } = data

  //TODO: Mover hacia variables de entorno
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const info = await transport.sendMail({
    from: '"Teto" <accounts@teto.com>',
    to: email,
    subject: 'Reset your password',
    text: 'Reset your password account on Teto',
    html: `<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
    <div style="background-color: #007bff; color: #ffffff; padding: 10px 0; border-top-left-radius: 10px; border-top-right-radius: 10px; font-family: Arial, sans-serif;">
        <h1>Reset your password at Teto</h1>
    </div>
    <p>Hi there ${name}! To reset your password, please click on the following link:</p>
    <a href=${process.env.FRONTEND_URL}/new-password/${token} style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; margin-top: 20px; border-radius: 5px;">Reset password</a>
    <p>If you did not request this, please ignore this email.</p>
    <p>Best regards,<br>The Teto Team</p>
</div>
    `
  })
}