import nodemailer from 'nodemailer';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Escalate a suspicious transaction via email
 * POST /api/support/escalate
 */
export const escalateTransaction = async (req, res, next) => {
  try {
    const { userName, userEmail, caseId, merchant, amount, date, risk, reason } = req.body;

    if (!caseId || !merchant || !amount) {
      throw new AppError('Missing required transaction details for escalation', 400);
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Standard Gmail SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const authorityEmail = 'authorityofficial123@gmail.com';
    const subject = `URGENT: Fraud escalation — Case ${caseId} (₹${Number(amount).toLocaleString()})`;

    const mailOptions = {
      from: `"${userName}" <${process.env.EMAIL_USER}>`, // Must send from authenticated user
      replyTo: userEmail,
      to: authorityEmail,
      subject: subject,
      text: `Dear Authority,

I am writing to escalate a suspicious transaction on my PayZen-linked account that requires urgent review.

Customer: ${userName}
Customer Email: ${userEmail}
Case ID: ${caseId}
Merchant: ${merchant}
Amount: ₹${Number(amount).toLocaleString()}
Date: ${date}
Risk Level: ${risk}
Urgency: HIGH — immediate action requested

Complaint reason:
${reason}

Please investigate this immediately.

Sincerely,
${userName}
(Sent via PayZen Hub)`
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Escalation email sent successfully to the authority.'
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    next(new AppError('Failed to send escalation email. Please check SMTP configuration.', 500));
  }
};
