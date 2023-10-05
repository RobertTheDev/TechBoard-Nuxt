import ICompany from '~/models/company/interfaces/Company';
import IUser from '~/models/user/interfaces/User';

export default interface ICompanyOwner {
  _id: string;
  createdAt: string;
  updatedAt?: Date;
  companyId: string;
  userId: string;
  company: ICompany;
  user: IUser;
}
