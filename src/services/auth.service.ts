import { ApiServiceBuilder } from './api.service';
class AuthService {
  private static instance: AuthService;
  private readonly api: ApiServiceBuilder;
  private constructor() {
    this.api = new ApiServiceBuilder();
  }

  public static getInstance(): AuthService {
    if (AuthService.instance === undefined || AuthService.instance === null) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public async login(email: string, password: string): Promise<void> {
    // const response = await this.api.build().post('/auth/sign-in', {
    //     email,
    //     password,
    // });
    const response = await this.api
      .withUrl('/auth/sign-in')
      .withBody({
        email,
        password,
      })
      .build()
      .post();
    console.log(response);
    console.log(response.data);
  }

  public logout(): void {
    // Logout
  }
}

// const test = async () => {
//   const authService = AuthService.getInstance();
//   await authService.login('nhao@qa.team', 'haonek2003');
// };
// test()
//   .then(() => console.log('Done'))
//   .catch((error) => console.log(error));
export default AuthService;
