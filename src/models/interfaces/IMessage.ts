import { type MessageTypes } from '../../constants/enums';

interface IMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content_type: MessageTypes;
  content: any; // Kiểu dữ liệu content có thể là bất kỳ
  sent_at: Date;
  is_active: boolean;
}
export default IMessage;
