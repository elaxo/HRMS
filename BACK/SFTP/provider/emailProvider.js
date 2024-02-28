
const PROVIDER = require('.')
const { Info, Obj } = require('../service/debug')
const {transporter} = require('../service/emailServer')





const SEND_EMAIL_TO_PENDING_EMPLOYEE = async (employee)=>{
    let company = await PROVIDER.COMPANY.COMPANY_BY_COMPANY_ID(employee.company)

    const info = await transporter.sendMail({
        from: {
            name: 'Inpowerhr - '+company.companyName,
            address: 'noreply@inpowerhr.com'
          },
      to: employee.email, // list of receivers
      subject: "Complete Your Registration Process in - "+company.companyName, // Subject line
      html: `
      <body>
  <h1 style="color:#00b050; width:100%;text-align:center;font-weight:bold;padding:4px; border-bottom:solid 2px;border-radius:2px">
    InpowerHR
  </h1>
  <div style="text-align:left;background-color:#00b050;padding:4px; color:white; border-radius:4px; padding-inline:10px">
    <strong style="font-size:24px;margin:10px"> Dear ${employee.firstName},</strong><br/>
<b> I hope this email finds you well. We are excited to have you as a new user on ${company.companyName}. To finalize your registration and gain full access to ${company.companyName} hr system, we kindly request you to complete the registration process by following the link provided below:
    </b>
    <p>
      By clicking on the link, you will be directed to a page where you can set up your account and provide any necessary information. Please note that this link is unique to your registration and should not be shared with others for security reasons.

If you have any questions or encounter any difficulties during the registration process, please don't hesitate to reach out to our support team at 
<a href="mail://support@inpowerhr.com">mail://support@inpowerhr.com</a> . We are here to assist you and ensure a smooth onboarding experience.

Thank you for choosing our system. We look forward to having you as an active member of our community.
    </p>
  </div>
  <a target="blank" style="margin:10px" href="${process.env.frontApp}/auth?payload=${employee.token}&&from=email">
  <button style="margin:auto;display:block;padding:10px; border-radius:4px; background-color:#00b050;color:white;border:none;outline:white">
  Click to continue
  </button>
  </a>
  or
  <a style="margin:10px" href="${process.env.frontApp}/auth?payload=${employee.token}&&from=email">
  ${process.env.frontApp}/auth?payload=${employee.token}&&from=email
  </a>
</body>
`    })
Obj(info)
}


module.exports = {
    SEND_EMAIL_TO_PENDING_EMPLOYEE
}









