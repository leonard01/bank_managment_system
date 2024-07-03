import { Account } from "../models/account";
import { Transaction } from "../models/transaction";

export class AccountService {
  private accounts: Account[] = [];
  private transactions: Transaction[] = [];

  createAccount(owner: string, type: "savings" | "checking"): Account {
    const newAccount: Account = {
      id: this.generateId(),
      owner,
      balance: 0,
      type,
      transactions: [],
    };
    this.accounts.push(newAccount);
    return newAccount;
  }

  getAccount(id: string): Account | undefined {
    return this.accounts.find((account) => account.id === id);
  }

  getAllAccounts(): Account[] {
    return this.accounts;
  }

  getAccountTransactions(accountId: string): Transaction[] {
    return this.transactions.filter(
      (transaction) => transaction.accountId === accountId
    );
  }

  deleteAccount(id: string): boolean {
    const index = this.accounts.findIndex((account) => account.id === id);
    if (index !== -1) {
      this.accounts.splice(index, 1);
      return true;
    }
    return false;
  }

  deposit(id: string, amount: number): boolean {
    const account = this.getAccount(id);
    if (account && amount > 0) {
      account.balance += amount;
      const transaction: Transaction = {
        id: this.generateId(),
        accountId: id,
        type: "deposit",
        amount,
        date: new Date(),
      };
      account.transactions.push(transaction);
      this.transactions.push(transaction);
      return true;
    }
    return false;
  }

  withdraw(id: string, amount: number): boolean {
    const account = this.getAccount(id);
    if (account && amount > 0 && account.balance >= amount) {
      account.balance -= amount;
      const transaction: Transaction = {
        id: this.generateId(),
        accountId: id,
        type: "withdrawal",
        amount,
        date: new Date(),
      };
      account.transactions.push(transaction);
      this.transactions.push(transaction);
      return true;
    }
    return false;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
