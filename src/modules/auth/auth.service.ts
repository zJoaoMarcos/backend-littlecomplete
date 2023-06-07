import { msalConfig } from '@/infra/auth/authConfig';
import * as msal from '@azure/msal-node';
import { SignOutRequest } from '@azure/msal-node/dist/request/SignOutRequest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private msal: msal.PublicClientApplication;

  constructor() {
    this.msal = new msal.PublicClientApplication(msalConfig);
  }

  async getAccessToken(request: msal.UsernamePasswordRequest): Promise<string> {
    const authResult = await this.msal.acquireTokenByUsernamePassword(request);

    return authResult.accessToken;
  }

  async signOut(request: SignOutRequest): Promise<void> {
    const signOutResult = await this.msal.signOut(request);

    return signOutResult;
  }
}
