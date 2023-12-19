import addressJson from '../assets/address.json';
import type Address from '../models/address';

export interface Province {
  name: string;
  code: number;
  codename: string;
  divisionType: string;
  phoneCode: number;
}
export interface District {
  provinceCode: number;
  name: string;
  code: number;
  divisionType: string;
  shortCodename: string;
}
export interface Ward {
  provinceCode: number;
  districtCode: number;
  name: string;
  code: number;
  divisionCope: string;
  shortCodename: string;
}
class AddressUtils {
  private provinces: Record<number, Province> = {};
  private districts: Record<number, Record<number, District>> = {};
  private wards: Record<number, Record<number, Record<number, Ward>>> = {};
  constructor() {
    const address = addressJson;
    address.forEach(
      (province: {
        name: string;
        code: number;
        codename: string;
        division_type: string;
        phone_code: number;
        districts: any;
      }) => {
        const provinceCode = province.code;
        this.provinces[provinceCode] = {
          name: province.name,
          code: provinceCode,
          codename: province.codename,
          divisionType: province.division_type,
          phoneCode: province.phone_code,
        };
        this.districts[provinceCode] = {};
        province.districts.forEach(
          (district: { name: string; code: number; division_type: string; short_codename: string; wards: any }) => {
            const districtCode = district.code;
            this.districts[provinceCode][districtCode] = {
              provinceCode,
              name: district.name,
              code: districtCode,
              divisionType: district.division_type,
              shortCodename: district.short_codename,
            };
            this.wards[provinceCode] = this.wards[provinceCode] ?? {};
            this.wards[provinceCode][districtCode] = {};
            district.wards.forEach(
              (ward: { name: string; code: number; division_type: string; short_codename: string }) => {
                this.wards[provinceCode][districtCode][ward.code] = {
                  provinceCode,
                  districtCode,
                  name: ward.name,
                  code: ward.code,
                  divisionCope: ward.division_type,
                  shortCodename: ward.short_codename,
                };
              },
            );
          },
        );
      },
    );
  }

  public getProvince = (code: number): Province | null => {
    return this.provinces[code] ?? null;
  };

  public getDistrict(provinceCode: number, districtCode: number): District | null {
    return this.districts[provinceCode]?.[districtCode] ?? null;
  }

  public getWard(provinceCode: number, districtCode: number, wardCode: number): Ward | null {
    return this.wards[provinceCode]?.[districtCode]?.[wardCode] ?? null;
  }

  public getProvinces(): Province[] {
    return Object.values(this.provinces);
  }

  public getDistricts(provinceCode: number): District[] {
    return Object.values(this.districts[provinceCode] ?? {});
  }

  public getWards(provinceCode: number, districtCode: number): Ward[] {
    return Object.values(this.wards[provinceCode]?.[districtCode] ?? {});
  }

  public getDetailedAddress(provinceCode: number, districtCode: number, wardCode: number): string | null {
    const province = this.getProvince(provinceCode);
    const district = this.getDistrict(provinceCode, districtCode);
    const ward = this.getWard(provinceCode, districtCode, wardCode);
    if (province != null && district != null && ward != null) {
      return `${ward.name}, ${district.name}, ${province.name}`;
    }
    return null;
  }

  public getDetail(address: Address): string | null {
    const detailedAddress = this.getDetailedAddress(address.province_code, address.district_code, address.ward_code);
    if (detailedAddress != null) {
      return `${address.detail !== null && address.detail !== undefined ? address.detail + ', ' : ''} ${detailedAddress}`;
    }
    return null;
  }

  private static readonly instance: AddressUtils = new AddressUtils();
  public static getInstance(): AddressUtils {
    return AddressUtils.instance;
  }
}
export default AddressUtils.getInstance();
