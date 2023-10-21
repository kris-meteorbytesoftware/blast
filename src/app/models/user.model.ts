import { BusinessModel } from './business.model';

export interface UserModel {
  id: number;
  email: string;
  userLevel: number;
  firstName: string;
  lastName: string;
  name: string;
  phone: string;
  username: string;
  profileUrl: string;
  timeZone: string;
  businessId: number;
  token: string;
  business: BusinessModel;
}
