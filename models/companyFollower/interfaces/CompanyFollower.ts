import ICompany from '~/models/company/interfaces/Company';
import IUser from '~/models/user/interfaces/User';

export default interface ICompanyFollower {
  _id: string;
  createdAt: string;
  updatedAt?: Date;

  company?: ICompany | null;
  companyId: string;
  user?: IUser | null;
  userId: string;
}
