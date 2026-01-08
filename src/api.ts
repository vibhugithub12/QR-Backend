const API_BASE = 'http://localhost:3000'

export type CreateQRRequest = {
  message: string
}

export type CreateQRResponse = {
  id: string
}

export type ConsumeQRResponse =
  | { message: string }
  | { error: string }

export async function consumeQR(
  id: string
): Promise<ConsumeQRResponse> {
  const res = await fetch(`${API_BASE}/qr/${id}`)

  return res.json()
}


export async function createQR(
  data: CreateQRRequest
): Promise<CreateQRResponse> {
  const res = await fetch(`${API_BASE}/qr`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error('Failed to create QR')
  }

  return res.json()
}
