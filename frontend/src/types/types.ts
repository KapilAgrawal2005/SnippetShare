interface ITag {
  _id: string;
  name: string;
}

interface IUser {
  _id: string;
  name: string;
  bio: string;
  email: string;
  photo: string;
  createdAt: string;
  github: string;
  linkedin: string;
  publicEmail: string;
  role: string;
}

interface ISnippet {
  _id: string;
  title: string;
  code: string;
  description: string;
  language: string;
  tags: ITag[];
  likes?: number;
  likedBy: string[];
  user: IUser;
  createdAt: string;
}

export type { ISnippet, IUser, ITag };
