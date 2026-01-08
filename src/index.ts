import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import { saveQR, getQR, deleteQR } from './store'
import { QRMessage } from './types'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/qr', (req, res) => {
  const { message } = req.body as { message?: string }

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  const id = crypto.randomUUID()

  const qr: QRMessage = {
    id,
    message,
    used: false,
    createdAt: new Date()
  }

  saveQR(qr)

  res.json({ id })
})


app.get('/qr/:id', (req, res) => {
  const qr = getQR(req.params.id)

  if (!qr) {
    return res.status(404).json({ error: 'Invalid QR code' })
  }

  if (qr.used) {
    return res.status(410).json({ error: 'QR code expired' })
  }

  // Delete QR after first use (one-time use)
  deleteQR(qr.id)

  res.json({ message: qr.message })
})


const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
