import IJobPost from '~/models/jobPost/interfaces/JobPost';
import IUser from '~/models/user/interfaces/User';

export default interface ISavedJobPost {
  _id: string;
  createdAt: string;
  updatedAt?: Date;

  jobPost?: IJobPost;
  jobPostId: string;
  user?: IUser;
  userId: string;
}
