import type IMessage from "./IMessage";
import type IParticipant from "./IParticipant";
import type { IUser } from "./IUser";

interface Conversation {
  id: string;
  created_at: Date;
  last_messsage_id: string;
  is_active: boolean;
  participants: IParticipant[];
  users: IUser[];
  last_message: IMessage;
}
export default Conversation;
