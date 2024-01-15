import type { IUser } from "./IUser";

interface Participant {
  conversation_id: string;
  user_id: string;
  joined_at: Date;
  read_last_message_at: Date;
  is_active: boolean;
}
interface Conversation {
  id: string;
  created_at: Date;
  last_messsage_id: string;
  is_active: boolean;
  participants: Participant[];
  users: IUser[];
}
export default Conversation;
