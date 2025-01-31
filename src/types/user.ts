export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    trialEndsAt: Date;
    isActive: boolean;
  }
  