export interface Transaction {
  id: string;
  accountId: string;
  type: "deposit" | "withdrawal";
  amount: number;
  date: Date;
}
