import crypto from "crypto";
import {
  create,
  PublicKeyCredentialWithAttestationJSON,
} from "@github/webauthn-json";

interface WebauthnCredential extends PublicKeyCredentialWithAttestationJSON {
  name?: string;
}

function clean(str: string) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function generateChallenge() {
  return clean(crypto.randomBytes(32).toString("base64"));
}

export async function createCredential(): Promise<WebauthnCredential> {
  const challenge = generateChallenge();
  let accountNonce = "0";
  const _salt = accountNonce;
  const saltUUID = crypto.createHash("sha256").update(_salt).digest("hex");
  const _credential: WebauthnCredential = await create({
    publicKey: {
      challenge: challenge,
      rp: {
        // Change these later
        name: "Rhinestone",
        id: window.location.hostname,
      },
      user: {
        id: saltUUID,
        name: "rhinestone wallet #" + parseInt(accountNonce),
        displayName: "rhinestone wallet #" + parseInt(accountNonce),
      },
      // Don't change these later
      pubKeyCredParams: [{ alg: -7, type: "public-key" }],
      timeout: 60000,
      attestation: "direct",
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "required",
        authenticatorAttachment: "platform",
      },
    },
  });
  _credential.name = "rhinestone wallet #" + (parseInt(accountNonce) + 1);
  return _credential;
}
