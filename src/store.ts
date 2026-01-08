import { QRMessage } from './types'

const store = new Map<string, QRMessage>()

export function saveQR(data: QRMessage): void {
  store.set(data.id, data)
}

export function getQR(id: string): QRMessage | undefined {
  return store.get(id)
}

export function deleteQR(id: string): void {
  store.delete(id)
}
