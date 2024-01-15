class AppConfig {
  public readonly isProduction = true;
  public readonly PRODUCTION_API_URL = 'https://nha-gia-re-server.onrender.com/api/v1';
  public readonly DEVELOPMENT_API_URL = 'http://localhost:8000/api/v1';
  public readonly API_URL = this.isProduction ? this.PRODUCTION_API_URL : this.DEVELOPMENT_API_URL;
}
export default new AppConfig();
