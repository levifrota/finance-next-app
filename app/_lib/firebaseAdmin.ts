import admin from "firebase-admin";

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountBase64) {
  throw new Error("A variável FIREBASE_SERVICE_ACCOUNT não está definida.");
}

const serviceAccountJson = Buffer.from(serviceAccountBase64, "base64").toString(
  "utf-8",
);
const serviceAccount = JSON.parse(serviceAccountJson);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestoreAdmin = admin.firestore();
