import ICompany from '~/models/company/interfaces/Company';

interface ISalary {
  min: number;
  max: number;
  rate: string;
}

export default interface IJobPost {
  // Default fields.
  _id: string;
  createdAt: Date;
  updatedAt?: Date;

  // Custom fields.
  // company: ICompany;
  // companyId: string;
  // contractType: string;
  // deadlineDate: Date;
  // description: string;
  // location?: {
  //   address: string;
  // };
  // locationType: string;
  // published: boolean;
  // salary: ISalary;
  // seniorLevel: string;
  title: string;
  // totalApplicants: number;
}
