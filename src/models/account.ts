// src/models/account.ts

export interface Account {
  id: string;
  owner: string;
  balance: number;
  type: "savings" | "checking";
}
