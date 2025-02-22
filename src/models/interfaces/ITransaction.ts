import type IMembershipPackage from './IMembershipPackage';

interface ITransaction {
  id: string;
  user_id: string;
  discount_id: string | null;
  package_id?: string;
  num_of_subscription_month: number;
  app_trans_id?: string | null;
  status: string;
  timestamp: Date;
  amount: number;
  platform: string;
  is_active: boolean;
  package: IMembershipPackage;
}
export default ITransaction;
