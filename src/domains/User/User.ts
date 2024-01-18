import { Hex } from 'viem'

export type User = {
  name: string
  email: string
  image: string
}

export type WebauthnCredential = {
  id: string
  publicKey: [Hex, Hex]
}
export type WebauthnSignatureObject = {
  signatureB64: string
  rawAuthenticatorDataB64: string
  rawClientDataJSONB64: string
  passkeyName: string
}
