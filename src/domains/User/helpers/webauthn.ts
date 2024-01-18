import cbor from 'cbor'
import { base64 } from '@scure/base'
import { WebauthnSignatureObject } from '../User'
import { Hex, encodeAbiParameters, keccak256, toBytes, toHex } from 'viem'

function formatBase64(base64String: string) {
  return (
    base64String.replace(/\-/g, '+').replace(/_/g, '/') +
    '=='.substring(0, (3 * base64String.length) % 4)
  )
}

// https://www.w3.org/TR/webauthn-2/#sctn-authenticator-data
function parseMakeCredAuthData(buffer: Uint8Array) {
  const rpIdHash = buffer.slice(0, 32)
  buffer = buffer.slice(32)
  const flagsBuf = buffer.slice(0, 1)
  buffer = buffer.slice(1)
  const flags = flagsBuf[0]
  const counterBuf = buffer.slice(0, 4)
  buffer = buffer.slice(4)
  const counter = Buffer.from(counterBuf).readUInt32BE(0)
  const aaguid = buffer.slice(0, 16)
  buffer = buffer.slice(16)
  const credIDLenBuf = buffer.slice(0, 2)
  buffer = buffer.slice(2)
  const credIDLen = Buffer.from(credIDLenBuf).readUInt16BE(0)
  const credID = buffer.slice(0, credIDLen)
  buffer = buffer.slice(credIDLen)
  const COSEPublicKey = buffer

  return {
    rpIdHash,
    flagsBuf,
    flags,
    counter,
    counterBuf,
    aaguid,
    credID,
    COSEPublicKey,
  }
}

// Takes COSE encoded public key and converts it to DER keys
// https://www.rfc-editor.org/rfc/rfc8152.html#section-13.1
function COSEECDHAtoDER(COSEPublicKey: Uint8Array): [Hex, Hex] {
  const coseStruct = cbor.decodeAllSync(COSEPublicKey)[0]
  const x = coseStruct.get(-2)
  const y = coseStruct.get(-3)

  return [toHex(x), toHex(y)]
}

// Parses Webauthn MakeCredential response
// https://www.w3.org/TR/webauthn-2/#sctn-op-make-cred
export function parseCreateResponse(rawAttestationObjectB64: string) {
  const rawAttestationObject = base64.decode(
    formatBase64(rawAttestationObjectB64),
  )
  const attestationObject = cbor.decode(rawAttestationObject)
  const authData = parseMakeCredAuthData(attestationObject.authData)
  const pubKey = COSEECDHAtoDER(authData.COSEPublicKey)
  return pubKey
}

function derToRS(derSignatureUint8Array: any) {
  // Convert the DER-encoded signature from hex to bytes
  // const derSignatureBytes = Buffer.from(derSignatureHex, 'hex')

  // Ensure the DER signature header is correct (0x30 for DER sequence)
  if (derSignatureUint8Array[0] !== 0x30) {
    throw new Error('Invalid DER signature format')
  }

  const rLength = derSignatureUint8Array[3]
  const rStart = 4
  const rEnd = rStart + rLength

  const sLength = derSignatureUint8Array[rEnd + 1]
  const sStart = rEnd + 2
  const sEnd = sStart + sLength

  // Extract r and s values from the DER signature
  const r = derSignatureUint8Array.slice(rStart, rEnd)
  const s = derSignatureUint8Array.slice(sStart, sEnd)
  return [BigInt(toHex(r)), BigInt(toHex(s))] as readonly [bigint, bigint]
}

export function parseSignatureResponse(result: WebauthnSignatureObject) {
  const derSig = base64.decode(formatBase64(result.signatureB64))
  const _rawAuthenticatorData = base64.decode(
    formatBase64(result.rawAuthenticatorDataB64),
  )
  const passkeyName = result.passkeyName
  const clientDataJSON = Buffer.from(
    base64.decode(formatBase64(result.rawClientDataJSONB64)),
  ).toString('utf-8')

  const challengeLocation = BigInt(clientDataJSON.indexOf('"challenge":"'))
  const rawAuthenticatorData = toHex(_rawAuthenticatorData)
  let authenticatorDataFlagMask: Hex = '0x01'

  if (
    (BigInt(toHex(rawAuthenticatorData[32])) &
      BigInt(authenticatorDataFlagMask)) !=
    BigInt(authenticatorDataFlagMask)
  ) {
    authenticatorDataFlagMask = '0x04'
    if (
      (BigInt(toHex(rawAuthenticatorData[32])) &
        BigInt(authenticatorDataFlagMask)) !=
      BigInt(authenticatorDataFlagMask)
    ) {
      throw new Error('Invalid authenticator data')
    }
  }

  return encodeAbiParameters(
    [
      { name: 'x', type: 'bytes32' },
      { name: 'x', type: 'bytes' },
      { name: 'x', type: 'bytes1' },
      { name: 'x', type: 'bytes' },
      { name: 'x', type: 'uint256' },
      { name: 'x', type: 'uint256[2]' },
    ],
    [
      keccak256(toBytes(passkeyName)),
      rawAuthenticatorData,
      authenticatorDataFlagMask,
      toHex(clientDataJSON),
      challengeLocation,
      derToRS(derSig),
    ],
  )
}
