import { ApiServiceBuilder } from './api.service';
import AuthService from './auth.service';

class UserService {
  private static instance: UserService;
  private readonly api: ApiServiceBuilder;
  private constructor() {
    this.api = new ApiServiceBuilder();
  }

  public static getInstance(): UserService {
    if (UserService.instance === undefined || UserService.instance === null) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  public async updateUser(): Promise<any> {
    const response = await this.api
      .withUrl('/users/update-profile')
      .withHeaders({
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWE5YTU3ODUtNzIxYS00YmI1LWJlYjctOWQ3NTJlMjA3MGQ0Iiwic2Vzc2lvbl9pZCI6ImNlNDQzYmQ2LTQxNGYtNGM1OS05YTA1LWEzNWZiNTg3Y2UyYyIsImlhdCI6MTcwMDI5MzQzNiwiZXhwIjoxNzAwMzc5ODM2fQ.odPZ6e2GE9LlPdYOVJwup_ymOPQf4tBRz6krSUV8L5k',
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
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWE5YTU3ODUtNzIxYS00YmI1LWJlYjctOWQ3NTJlMjA3MGQ0Iiwic2Vzc2lvbl9pZCI6ImY4NDcyZWJiLTk5OWItNGIyNi04YTkwLTE5ZjcxZTI5Mjk2YSIsImlhdCI6MTcwMzAwNDI5NCwiZXhwIjoxNzA1NTk2Mjk0fQ.Zt5v6ES-fage9sLz-QRiBTN-0fTNXHp4Q7PnMO6XVFs';
    const response = await this.api
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

UserService.getInstance()
  .getMyProfile()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error.message);
    console.log(error.response.data);
  });
