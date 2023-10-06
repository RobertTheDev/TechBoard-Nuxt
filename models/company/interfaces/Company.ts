import ICompanyOwner from '~/models/companyOwner/interfaces/CompanyOwner';

export default interface ICompany {
  // Default fields.
  _id: string;
  createdAt: string;
  updatedAt?: Date;

  // Custom fields.
  category: string;
  coverImageUrl: string | null;
  description: string;
  logoUrl: string | null;
  name: string;
  totalEmployees: string;

  // Lookup fields.
  owners: ICompanyOwner[];
}
