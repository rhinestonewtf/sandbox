import { Account } from '../../Account'
import { get } from '@github/webauthn-json'
import { parseSignatureResponse } from '../../User/helpers/webauthn'

export async function signUserOpHash(userOpHash: string, account: Account) {
  const keyName = 'testFinalNew'
  const sigCredential = await get({
    publicKey: {
      challenge: Buffer.from(userOpHash, 'hex').toString('base64'),
      timeout: 60000,
      userVerification: 'required',
      rpId: window.location.hostname,
      allowCredentials: [
        {
          id: account.webauthnKeyId, // rawId
          type: 'public-key',
        },
      ],
    },
  })
  return parseSignatureResponse({
    signatureB64: sigCredential.response.signature,
    rawAuthenticatorDataB64: sigCredential.response.authenticatorData,
    rawClientDataJSONB64: sigCredential.response.clientDataJSON,
    passkeyName: keyName,
  })
}
