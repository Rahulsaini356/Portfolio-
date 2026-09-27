import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const recipientEmail = 'rahulsainirs029@gmail.com';
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    // 1. If Web3Forms Access Key is provided
    if (web3formsKey) {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email,
          subject: subject || `Portfolio Contact from ${name}`,
          message,
          from_name: 'Rahul Saini Portfolio'
        })
      });

      const data = await response.json();
      if (data.success) {
        return NextResponse.json({ success: true, method: 'web3forms' });
      }
    }

    // 2. If Resend API Key is provided
    if (resendKey) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: recipientEmail,
          reply_to: email,
          subject: subject || `Portfolio Contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        })
      });

      if (resendRes.ok) {
        return NextResponse.json({ success: true, method: 'resend' });
      }
    }

    // Fallback: Acknowledge receipt so client can open mailto or confirm
    return NextResponse.json({
      success: true,
      method: 'direct_mailto',
      mailto: `mailto:${recipientEmail}?subject=${encodeURIComponent(subject || `Message from ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
