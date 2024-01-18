import { WebauthnCredential } from '../../User/User'
import { ContractDependencies } from '@/src/constants/contracts'

import { InitialModule } from '../Module'
import { Address, encodeAbiParameters } from 'viem'

export const getInstallECDSAData = (
  contractDependencies: ContractDependencies,
  ownerAddress: Address,
): InitialModule => {
  return {
    module: contractDependencies.ECDSA_VALIDATOR_ADDRESS,
    data: encodeAbiParameters(
      [{ name: 'owner', type: 'address' }],
      [ownerAddress],
    ),
  }
}

export const getInstallWebauthnData = (
  contractDependencies: ContractDependencies,
  webAuthnCredential: WebauthnCredential,
): InitialModule => {
  return {
    module: contractDependencies.WEBAUTHN_VALIDATOR_ADDRESS,
    data: encodeAbiParameters(
      [
        {
          components: [
            {
              name: 'pubKeyX',
              type: 'uint256',
            },
            {
              name: 'pubKeyY',
              type: 'uint256',
            },
            {
              name: 'keyId',
              type: 'string',
            },
          ],
          name: 'PassKeyId',
          type: 'tuple',
        },
      ],
      [
        {
          pubKeyX: BigInt(webAuthnCredential.publicKey[0]),
          pubKeyY: BigInt(webAuthnCredential.publicKey[1]),
          keyId: webAuthnCredential.id,
        },
      ],
    ),
  }
}
