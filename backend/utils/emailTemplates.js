export const generateResetPasswordEmailTemplate =(resetLink)=>{
    return `<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f9fa; padding: 30px; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0 0 10px 0;">Password Reset</h1>
        </div>
        
        <div style="margin-bottom: 25px;">
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #3498db; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        
        <div style="margin-bottom: 25px;">
            <p>If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>
            <p>This password reset link will expire in 15 miniutes.</p>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #777;">
            <p>Thanks,</p>
            <p>The Snippy Team</p>
            <p style="margin-top: 20px;">If you're having trouble with the button above, copy and paste the URL below into your web browser:</p>
            <p style="word-break: break-all;">${resetLink}</p>
        </div>
    </div>
</body>`
}