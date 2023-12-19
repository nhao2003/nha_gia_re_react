import { PropertyTypes } from '../constants/enums';
import {
  AparmentFeatures,
  HouseFeatures,
  LandFeatures,
  MotelFeatures,
  OfficeFeatures,
} from '../services/CreatePostData';
import type Address from './address';

interface RealEstatePost {
  id: string;
  user_id: string;
  project_id: string;
  type_id: PropertyTypes;
  unit_id: string;
  status: string;
  title: string;
  description: string;
  area: number;
  address: Address;
  address_point: string | null;
  price: number;
  deposit: number | null;
  is_lease: boolean;
  posted_date: Date;
  expiry_date: Date;
  images: string[];
  //videos: string[];
  is_pro_seller: boolean;
  info_message: string | null | undefined;
  display_priority_point: number;
  features: MotelFeatures | AparmentFeatures | OfficeFeatures | LandFeatures | HouseFeatures;
  post_approval_priority_point: number;
  update_count: number;
  is_active: boolean;
  address_detail: string | null;
}
export default RealEstatePost;
