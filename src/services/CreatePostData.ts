import type {  ApartmentTypes, Direction, FurnitureStatus, LandTypes, LegalDocumentStatus } from '../constants/enums';
import type Address from '../models/address';

interface MotelFeatures {
  water_price?: number | null;
  electric_price?: number | null;
  furniture_status?: FurnitureStatus;
}
interface AparmentFeatures {
  furniture_status?: FurnitureStatus;
  apartment_type: ApartmentTypes;
  is_corner?: boolean;
  is_hand_over?: boolean;
  num_of_bed_rooms?: number;
  num_of_toilets?: number;
  balcony_direction?: string;
  block?: string;
  floor?: string;
  legal_document_status?: LegalDocumentStatus;
  apartment_number?: string;
  show_apartment_number?: boolean;
}
interface OfficeFeatures {
  furniture_status?: FurnitureStatus;
  office_type: string;
  is_facade?: boolean;
  main_door_direction?: Direction;
  block?: string;
  floor?: string;
  legal_docment_status?: LegalDocumentStatus;
  office_number?: string;
  show_office_number?: boolean;
}
interface HouseFeatures {
  furniture_status?: FurnitureStatus;
  house_type: string;
  is_facade?: boolean;
  has_wide_alley?: boolean;
  is_widens_towards_the_back?: boolean;
  num_of_bed_rooms?: number;
  num_of_toilets?: number;
  num_of_floors?: number;
  main_door_direction?: Direction;
  width?: number;
  length?: number;
  area_used?: number;
  legal_docment_status?: LegalDocumentStatus;
  house_number?: string;
  show_house_number?: boolean;
}

interface LandFeatures {
  land_lot_code?: string;
  subdivision_name?: string;
  land_type: LandTypes;
  is_facade?: boolean;
  has_wide_alley?: boolean;
  is_widens_towards_the_back?: boolean;
  land_direction?: Direction;
  width?: number;
  length?: number;
  legal_docment_status?: LegalDocumentStatus;
  show_land_lot_code?: boolean;
}

interface PropertyListing {
  type_id: string;
  title: string;
  description: string;
  price?: number | null;
  deposit?: number | null;
  area: number;
  images: string[];
  address: Address;
  features: MotelFeatures | AparmentFeatures | OfficeFeatures | HouseFeatures | LandFeatures;
  is_lease: boolean;
  is_pro_seller: boolean;
}

export type { PropertyListing, MotelFeatures, AparmentFeatures, OfficeFeatures, HouseFeatures, LandFeatures}
