import IJobPost from '~/models/jobPost/interfaces/JobPost';
import IUser from '~/models/user/interfaces/User';

export default interface IJobOffer {
  // Default fields.
  _id: string;
  createdAt: string;
  updatedAt?: Date;

  // Custom fields.
  deadlineDate: Date | null;
  status: string;

  // Lookup Fields.
  jobPost: IJobPost;
  jobPostId: string;
  user: IUser;
  userId: string;
}
