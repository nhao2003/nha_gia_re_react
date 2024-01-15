import { ApiServiceBuilder } from './api.service';
import AuthService from './auth.service';

class UserService {
  private static instance: UserService;
  api(): ApiServiceBuilder {
    return new ApiServiceBuilder();
  }
  
  public static getInstance(): UserService {
    if (UserService.instance === undefined || UserService.instance === null) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  public async updateUser(): Promise<any> {
    const accessToken = await AuthService.getInstance().getAccessToken();
    const response = await this.api()
      .withUrl('/users/update-profile')
      .withHeaders({
        Authorization:
          'Bearer ' + accessToken,
      })
      .withBody({
        first_name: 'Hào',
        last_name: 'Nguyễn',
        address: {
          province_code: 1,
          district_code: 1,
          ward_code: 1,
          detail: '32 Hoàng Mai',
        },
        gender: true,
        dob: '1990-01-15',
        phone: '0342841467',
      })
      .build()
      .patch();

    return response.data ?? null;
  }

  public async getMyProfile(): Promise<any> {
    const accessToken = await AuthService.getInstance().getAccessToken();
    const response = await this.api()
      .withUrl('/users/profile')
      .withHeaders({
        Authorization: `Bearer ${accessToken}`,
      })
      .build()
      .get();

    return response.data ?? null;
  }
}

export default UserService;

// UserService.getInstance()
//   .getMyProfile()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error.message);
//     console.log(error.response.data);
//   });
