// src/services/accountService.ts

import { Account } from "../models/account";

export class AccountService {
  private accounts: Account[] = [];

  createAccount(owner: string, type: "savings" | "checking"): Account {
    const newAccount: Account = {
      id: this.generateId(),
      owner,
      balance: 0,
      type,
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
      return true;
    }
    return false;
  }

  withdraw(id: string, amount: number): boolean {
    const account = this.getAccount(id);
    if (account && amount > 0 && account.balance >= amount) {
      account.balance -= amount;
      return true;
    }
    return false;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
