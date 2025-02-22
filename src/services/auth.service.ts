import { ApiServiceBuilder } from './api.service';
class AuthService {
  private static instance: AuthService;
  api(): ApiServiceBuilder {
    return new ApiServiceBuilder();
  }

  public static getInstance(): AuthService {
    if (AuthService.instance === undefined || AuthService.instance === null) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public isTokenExpired(token: string): boolean {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    console.log(decodedToken);
    const currentTime = Date.now() / 1000;
    console.log(currentTime);
    return decodedToken.exp < currentTime;
  }

  public async login(email: string, password: string): Promise<void> {
    const response = await this.api()
      .withUrl('/auth/sign-in')
      .withBody({
        email,
        password,
      })
      .build()
      .post();
    console.log(response.data);
  }

  public async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken === null) {
      throw new Error('Refresh token is null');
    }
    if (this.isTokenExpired(refreshToken)) {
      throw new Error('Refresh token is expired');
    }
    const response = await this.api()
      .withUrl('/auth/refresh-token')
      .withBody({
        refresh_token: refreshToken,
      })
      .build()
      .get<{
        status: string;
        message: string;
        result: {
          access_token: string;
          refresh_token: string;
        };
      }>();
    if (response.data.status === 'fail' || response.data.status === 'error') {
      throw new Error(response.data.message ?? 'Refresh token is invalid');
    }
    localStorage.setItem('access_token', response.data.result.access_token);
    return response.data.result.access_token;
  }

  public async getAccessToken(): Promise<string | null> {
    const accessToken = localStorage.getItem('access_token');
    if (this.isTokenExpired(accessToken ?? '')) {
      try {
        const newAccessToken = await this.refreshToken();
        return newAccessToken;
      } catch (error) {
        // Set access token to null
        localStorage.setItem('access_token', '');
        return null;
      }
    }
    return accessToken;
  }

  public getRefreshToken(): string | null {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken === null) {
      return null;
    }
    return refreshToken;
  }

  public logout(): void {
    // Logout
  }

  // Check if user is authenticated
  public async isUserSignedIn(): Promise<boolean> {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken === null) {
      return false;
    }
    try {
      await this.refreshToken();
      return true;
    } catch (error) {
      return false;
    }
  }

  public async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<{
    status: boolean;
    message: string;
  }> {
    // Change password
    const accessToken = await this.getAccessToken();
    if (accessToken === null) {
      return {
        status: false,
        message: 'Bạn chưa đăng nhập',
      };
    }
    const changePassword = this.api()
      .withUrl('/auth/change-password')
      .withBody({
        old_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: newPassword,
      })
      .withHeaders({
        Authorization: `Bearer ${accessToken}`,
      })
      .build();
    try {
      const response = await changePassword.post();
      console.log("Change password response: ", response.data);
      return {
        status: true,
        message: 'Thay đổi mật khẩu thành công',
      };
    } catch (error: any) {
      console.log("Change password error: ", error.response.data);
      const message = error.response.data.code === 108 ? 'Mật khẩu hiện tại không đúng' : 'Thay đổi mật khẩu thất bại';
      return {
        status: false,
        message,
      };
    }
  }

  public getUserIdFromToken(): string | null {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken === null) {
      return null;
    }
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    return decodedToken.user_id;
  }
}
export default AuthService;