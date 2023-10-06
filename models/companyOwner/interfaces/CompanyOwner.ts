import ICompany from '~/models/company/interfaces/Company';
import IUser from '~/models/user/interfaces/User';

export default interface ICompanyOwner {
  _id: string;
  createdAt: string;
  updatedAt?: Date;

  company: ICompany;
  companyId: string;
  user: IUser;
  userId: string;
}
