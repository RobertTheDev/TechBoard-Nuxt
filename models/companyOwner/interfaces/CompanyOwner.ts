import ICompany from '~/models/company/interfaces/Company';
import IProfile from '~/models/profile/interfaces/Profile';

export default interface ICompanyOwner {
  _id: string;
  createdAt: string;
  updatedAt?: Date;

  company: ICompany;
  companyId: string;
  user: IProfile;
  userId: string;
}
