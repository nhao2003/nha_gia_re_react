import { ApiServiceBuilder } from './api.service';
import AuthService from './auth.service';
class ConversationService {
  private static instance: ConversationService;

  public static getInstance(): ConversationService {
    if (ConversationService.instance === undefined || ConversationService.instance === null) {
      ConversationService.instance = new ConversationService();
    }

    return ConversationService.instance;
  }

  api(): ApiServiceBuilder {
    return new ApiServiceBuilder();
  }

  public async getConversation(otherUserId: string): Promise<any> {
    // const accessToken = await AuthService.getInstance().getAccessToken();
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWE5YTU3ODUtNzIxYS00YmI1LWJlYjctOWQ3NTJlMjA3MGQ0Iiwic2Vzc2lvbl9pZCI6IjcxMTM3MjE3LTk3NTEtNDcyMS05MWMyLTcyOWI4Y2MyMDU2NyIsImlhdCI6MTcwNTEzNDExNCwiZXhwIjoxNzA3NzI2MTE0fQ.vBNFB6szeFToK6rWKh6MxTriJXSUPhRfdJ56xVAA1Rk'
    const response = await this.api()
      .withUrl('/conversations')
      .withBody({
        other_user_id: otherUserId,
      })
      .withHeaders({
        Authorization: `Bearer ${accessToken}`,
      })
      .build()
      .post();

    return response.data;
  }
}

export default { ConversationService };

ConversationService.getInstance()
  .getConversation('28223664-4747-424e-b2e3-27ace26bc553')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
