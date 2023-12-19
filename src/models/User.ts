import type { UserStatus } from "../constants/enums";
import type Address from "./address";

interface User {
  id: string;
  status: UserStatus; // Add other possible status values if needed
  is_identity_verified: boolean  | null;
  role: 'user' | 'admin' | 'moderator'; // Add other possible role values if needed
  email: string;
  address: Address | null;
  first_name: string | null;
  last_name: string | null;
  gender: boolean | null ; // true for male, false for female
  avatar: string | null;
  dob: Date | null; // Assuming date of birth is a string in the format 'YYYY-MM-DD'
  phone: string | null;
  last_active_at: string | null; // Assuming it's a timestamp in string format
  created_at: string | null; // Assuming it's a timestamp in string format
  updated_at: string | null; // Assuming it's a timestamp in string format
  banned_util: string | null; // Assuming it's a timestamp in string format or null
  ban_reason: string | null;
}

export type { User };
