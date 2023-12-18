import type Address from './address';

interface RealEstatePost {
  id: string;
  user_id: string;
  project_id: string;
  type_id: string;
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
  videos: string[];
  is_pro_seller: boolean;
  info_message: string | null | undefined;
  display_priority_point: number;
  features: any;
  post_approval_priority_point: number;
  update_count: number;
  is_active: boolean;
  address_detail: string | null;
}
export default RealEstatePost;
