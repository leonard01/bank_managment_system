import { Transaction } from "./transaction";

export interface Account {
  id: string;
  owner: string;
  balance: number;
  type: "savings" | "checking";
  transactions: Transaction[]; // Add this line
}
