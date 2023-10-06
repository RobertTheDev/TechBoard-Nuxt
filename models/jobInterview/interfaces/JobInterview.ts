import IJobPost from '~/models/jobPost/interfaces/JobPost';
import IUser from '~/models/user/interfaces/User';

export default interface IJobInterview {
  // Default fields.
  _id: string;
  createdAt: string;
  updatedAt?: Date;

  // Local Fields.
  startTime: Date;
  endTime: Date | null;

  // Lookup Fields.
  jobPost: IJobPost;
  jobPostId: string;
  user: IUser;
  userId: string;
}
