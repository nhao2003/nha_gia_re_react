import type IMembershipPackage from './IMembershipPackage';

interface ISubscription {
  id: string;
  user_id: string;
  package_id: string;
  transaction_id: string | null;
  starting_date: Date;
  expiration_date: Date;
  is_active: boolean;
  membership_package: IMembershipPackage;
}
export default ISubscription;
