class Address {
  province_code: number;
  district_code: number;
  ward_code: number;
  detail?: string | null;
  constructor(provinceCode: number, districtCode: number, wardCode: number, detail?: string) {
    this.province_code = provinceCode;
    this.district_code = districtCode;
    this.ward_code = wardCode;
    this.detail = detail;
  }
}
export default Address;
