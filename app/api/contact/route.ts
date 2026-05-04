import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function toTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = toTrimmedString(body.name);
    const email = toTrimmedString(body.email);
    const company = toTrimmedString(body.company);
    const phone = toTrimmedString(body.phone);
    const message = toTrimmedString(body.message);

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);
    const phoneHref = phone.replace(/[^\d+]/g, '');

    const { data, error } = await resend.emails.send({
      from: 'Contact <contact@velvetneuron.com>',
      to: ['hello@velvetneuron.com'],
      replyTo: email,
      subject: `Novo pedido de diagnóstico de ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #124e46;">Novo pedido de diagnóstico gratuito</h2>
          <hr style="border: none; border-top: 1px solid #d9cec0;" />
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Telefone:</strong> ${phoneHref ? `<a href="tel:${phoneHref}">${safePhone}</a>` : safePhone}</p>
          ${company ? `<p><strong>Empresa:</strong> ${safeCompany}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #d9cec0;" />
          <h3 style="color: #17211d;">Processo a analisar</h3>
          <p style="white-space: pre-wrap; color: #5f675f;">${safeMessage}</p>
          <hr style="border: none; border-top: 1px solid #d9cec0;" />
          <p style="color: #5f675f; font-size: 12px;">Enviado pelo formulário de diagnóstico em velvetneuron.com</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
