import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

function getOAuthClient() {
  const client = new OAuth2Client({
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    redirectUri: process.env.GMAIL_REDIRECT_URI,
  })

  if (process.env.GMAIL_REFRESH_TOKEN) {
    client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    })
  }

  return client
}

export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const auth = getOAuthClient()
  const gmail = google.gmail({ version: 'v1', auth })
  const rawMessage = Buffer.from(
    `From: Music Mission Controll <office@musicmission.at>\r\nTo: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/html; charset=utf-8\r\n\r\n${html}`,
    'utf-8',
  ).toString('base64url')

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: rawMessage,
    },
  })
}

export async function listThreads() {
  const auth = getOAuthClient()
  const gmail = google.gmail({ version: 'v1', auth })
  const response = await gmail.users.threads.list({
    userId: 'me',
    maxResults: 25,
  })
  return response.data.threads ?? []
}
