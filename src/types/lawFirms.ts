import { User } from "./user";

// Interface for Law Firm Contact Information
export interface ContactInfo {
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
  };
  email: string;
  mobile: string;
}

// Interface for Case Details
export interface CaseDetails {
  caseSolvedCount: number;
  caseBasedBillRate: string;
  timeBasedBillRate: string;
  previousCases: {
    caseType: string;
    caseDescription: string;
    _id: string;
  }[];
}

// Interface for Professional Details
export interface ProfessionalDetails {
  caseDetails: CaseDetails;
  lawyerType: string;
}

// Interface for Bank Account Details
export interface BankAccountDetails {
  cardDetails: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    saveCard: boolean;
  };
  bankDetails: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
  paymentMethod: string;
  upiId: string;
}

// Main Law Firm Interface
export interface LawFirm {
  _id: string;
  lawFirmDetails: {
    contactInfo: ContactInfo;
    lawFirmName: string;
    operatingSince: string;
    yearsOfExperience: string;
    specialization: string;
  };
  professionalDetails: ProfessionalDetails;
  bankAccountDetails: BankAccountDetails;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  users: User[];
  status: "active" | "inactive";
}

// DTO for Adding Users to a Law Firm
export interface AddUsersToLawFirmDTO {
  userIds: string[];
}