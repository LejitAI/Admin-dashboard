import { User } from "./user";
export interface LawFirm {
    id: string;
    name: string;
    address: string;
    contactNumber: string;
    users: User[];
    createdAt: Date;
    trialEndsAt?: Date;
    activePlanEndsAt?: Date;
  }