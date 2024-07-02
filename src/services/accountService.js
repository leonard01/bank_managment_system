"use strict";
// src/services/accountService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
class AccountService {
    constructor() {
        this.accounts = [];
    }
    createAccount(owner, type) {
        const newAccount = {
            id: this.generateId(),
            owner,
            balance: 0,
            type,
        };
        this.accounts.push(newAccount);
        return newAccount;
    }
    getAccount(id) {
        return this.accounts.find((account) => account.id === id);
    }
    deposit(id, amount) {
        const account = this.getAccount(id);
        if (account) {
            account.balance += amount;
            return true;
        }
        return false;
    }
    withdraw(id, amount) {
        const account = this.getAccount(id);
        if (account && account.balance >= amount) {
            account.balance -= amount;
            return true;
        }
        return false;
    }
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}
exports.AccountService = AccountService;
