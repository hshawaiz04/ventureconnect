
import { getAuth } from 'firebase/auth';
import { auth } from '.';

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  public request: SecurityRuleContext;
  public user: any;

  constructor(request: SecurityRuleContext) {
    const user = auth.currentUser;

    let userForSigning;
    if (user) {
      userForSigning = {
        uid: user.uid,
        token: {
          name: user.displayName,
          picture: user.photoURL,
          email: user.email,
          email_verified: user.emailVerified,
          phone_number: user.phoneNumber,
          firebase: {
            identities: {
              'google.com': user.providerData
                .filter((p) => p.providerId === 'google.com')
                .map((p) => p.uid),
            },
            sign_in_provider:
              user.providerData.length > 0
                ? user.providerData[0].providerId
                : 'password',
          },
        },
      };
    }

    const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:
{
  "auth": ${JSON.stringify(userForSigning, null, 2)},
  "method": "${request.operation}",
  "path": "/databases/(default)/documents/${request.path}"
}`;

    super(message);
    this.name = 'FirestorePermissionError';
    this.request = request;
    this.user = userForSigning;

    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }
}
