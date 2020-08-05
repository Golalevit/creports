/* eslint-disable class-methods-use-this */
import { store } from '@/store';

export class LoginGuard {
  async canActivate() {
    const { auth } = store.getState();
    return auth.isAuthenticated;
  }
}
