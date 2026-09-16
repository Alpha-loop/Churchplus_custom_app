import { ImageSourcePropType } from "react-native";

export interface BankAccount {
  id: string;

  bankName: string;

  accountNumber: string;

  accountName: string;

  description?: string;

  bankLogoSource?: ImageSourcePropType;
}

export interface GivingSummary {
  option: string;

  amount: string;
}

export interface PaymentOption {
  id: string;

  name: string;

  imageSource: any;
}

export interface DonationCategory {
  id: string;

  name: string;
}

export interface PledgeAction {
  id: number;

  header: string;

  subText: string;

  type: "make" | "redeem";
}