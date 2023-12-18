export enum UserStatus {
  unverified = 'unverified',
  not_update = 'not_update',
  banned = 'banned',
  deleted = 'deleted',
  verified = 'verified',
}

export enum Role {
  admin = 'admin',
  staff = 'staff',
  user = 'user',
}

export enum OTPTypes {
  account_activation = 'account_activation',
  password_recovery = 'password_recovery',
}

export enum PostStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  hided = 'hided',
}
export enum PropertyTypes {
  apartment = 'apartment',
  land = 'land',
  office = 'office',
  motel = 'motel',
  house = 'house',
}

export enum ApartmentTypes {
  apartment = 'apartment',
  duplex = 'duplex',
  officetel = 'officetel',
  service = 'service',
  dormitory = 'dormitory',
  penhouse = 'penhouse',
}

export enum LandTypes {
  residential = 'residential',
  commercial = 'commercial',
  industrial = 'industrial',
  agricultural = 'agricultural',
}

export enum OfficeTypes {
  office = 'office',
  officetel = 'officetel',
  shophouse = 'shophouse',
  comercialspace = 'comercialspace',
}

export enum HouseTypes {
  townhouse = 'townhouse',
  villa = 'villa',
  alleyhouse = 'alleyhouse',
  frontagehouse = 'frontagehouse',
}

export enum FurnitureStatus {
  empty = 'empty',
  basic = 'basic',
  full = 'full',
  high_end = 'high_end',
}

export function propertyTypeToString(e: PropertyTypes) {
  switch (e) {
    case PropertyTypes.apartment:
      return 'Căn hộ';
    case PropertyTypes.land:
      return 'Đất';
    case PropertyTypes.office:
      return 'Văn phòng';
    case PropertyTypes.motel:
      return 'Nhà trọ';
    case PropertyTypes.house:
      return 'Nhà phố';
  }
}

export function apartmentTypeToString(e: ApartmentTypes) {
  switch (e) {
    case ApartmentTypes.apartment:
      return 'Căn hộ';
    case ApartmentTypes.duplex:
      return 'Duplex';
    case ApartmentTypes.officetel:
      return 'Officetel';
    case ApartmentTypes.service:
      return 'Service';
    case ApartmentTypes.dormitory:
      return 'Ký túc xá';
    case ApartmentTypes.penhouse:
      return 'Penhouse';
  }
}

export function landTypeToString(e: LandTypes) {
  switch (e) {
    case LandTypes.residential:
      return 'Đất ở';
    case LandTypes.commercial:
      return 'Đất thương mại';
    case LandTypes.industrial:
      return 'Đất công nghiệp';
    case LandTypes.agricultural:
      return 'Đất nông nghiệp';
  }
}

export function officeTypeToString(e: OfficeTypes) {
  switch (e) {
    case OfficeTypes.office:
      return 'Văn phòng';
    case OfficeTypes.officetel:
      return 'Officetel';
    case OfficeTypes.shophouse:
      return 'Shophouse';
    case OfficeTypes.comercialspace:
      return 'Không gian thương mại';
  }
}

export function houseTypeToString(e: HouseTypes) {
  switch (e) {
    case HouseTypes.townhouse:
      return 'Nhà phố';
    case HouseTypes.villa:
      return 'Biệt thự';
    case HouseTypes.alleyhouse:
      return 'Nhà ngõ';
    case HouseTypes.frontagehouse:
      return 'Nhà mặt phố';
  }
}

export function furnitureStatusToString(e: FurnitureStatus) {
  switch (e) {
    case FurnitureStatus.empty:
      return 'Trống';
    case FurnitureStatus.basic:
      return 'Cơ bản';
    case FurnitureStatus.full:
      return 'Đầy đủ';
    case FurnitureStatus.high_end:
      return 'Sang trọng';
  }
}

export enum Direction {
  east = 'east',
  west = 'west',
  south = 'south',
  north = 'north',
  north_east = 'north_east',
  north_west = 'north_west',
  south_east = 'south_east',
  south_west = 'south_west',
}
export function directionEnumToString(e: Direction) {
  switch (e) {
    case Direction.east:
      return 'Đông';
    case Direction.west:
      return 'Tây';
    case Direction.south:
      return 'Nam';
    case Direction.north:
      return 'Bắc';
    case Direction.north_east:
      return 'Đông Bắc';
    case Direction.north_west:
      return 'Tây Bắc';
    case Direction.south_east:
      return 'Đông Nam';
    case Direction.south_west:
      return 'Tây Nam';
  }
}

export enum LegalDocumentStatus {
  waiting_for_certificates = 'waiting_for_certificates',
  have_certificates = 'have_certificates',
  other_documents = 'other_documents',
}

export function legalDocumentStatusToString(e: LegalDocumentStatus) {
  switch (e) {
    case LegalDocumentStatus.waiting_for_certificates:
      return 'Chờ giấy tờ';
    case LegalDocumentStatus.have_certificates:
      return 'Đã có giấy tờ';
    case LegalDocumentStatus.other_documents:
      return 'Giấy tờ khác';
  }
}

export enum MessageTypes {
  text = 'text',
  media = 'media',
  location = 'location',
  post = 'post',
}

export enum ReportStatus {
  pending = 'pending',
  resolved = 'resolved',
  rejected = 'rejected',
}

export enum ReportType {
  user = 'user',
  post = 'post',
  conversation = 'conversation',
}

export enum ReportContentType {
  spam = 'spam',
  offensive = 'offensive',
  inappropriate = 'inappropriate',
  other = 'other',
}

export enum Progression {
  // Chưa khởi công
  not_start = 'not_start',
  // Đang khởi công
  in_progress = 'in_progress',
  // Đã hoàn thành
  completed = 'completed',
}

export enum ProjectStatus {
  // Sắp mở bán
  upcoming = 'upcoming',
  // Đang mở bán
  opening = 'opening',
  // Đã bàn giao
  delivered = 'delivered',
}
