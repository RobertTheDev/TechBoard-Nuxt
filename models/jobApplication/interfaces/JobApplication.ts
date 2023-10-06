import IJobPost from '~/models/jobPost/interfaces/JobPost';
import IUser from '~/models/user/interfaces/User';

export default interface IJobApplication {
  // Default fields.
  _id: string;
  createdAt: string;
  updatedAt?: Date;

  // Local Fields.
  cvUrl: string;
  message: string | null;
  status: string;

  // Lookup Fields.
  jobPost: IJobPost;
  jobPostId: string;
  user: IUser;
  userId: string;
}
