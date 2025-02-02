import { User } from "./user";
export interface LawFirm {
  _id: string;
  name: string;
  users: User[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface AddUsersToLawFirmDTO {
  userIds: string[];
}