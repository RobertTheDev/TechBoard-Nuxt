import ICompanyOwner from '~/models/companyOwner/interfaces/CompanyOwner';

interface ICompanyLogo {
  // Custom fields.
  alt: string;
  url: string;
}

interface ICoverImage {
  // Custom fields.
  alt: string;
  url: string;
}

export default interface ICompany {
  // Default fields.
  _id: string;
  createdAt: string;
  updatedAt?: Date;

  // Custom fields.
  category: string;
  coverImage: ICoverImage | null;
  description: string;
  logo: ICompanyLogo | null;
  name: string;
  totalEmployees: string;

  // Lookup fields.
  owners: ICompanyOwner[];
}
