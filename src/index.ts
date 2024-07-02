// src/index.ts

import { AccountService } from "./services/accountService";

const accountService = new AccountService();

// Create a new account
const account = accountService.createAccount("John Doe", "savings");
console.log("Created Account:", account);

// Deposit money
const depositSuccess = accountService.deposit(account.id, 1000);
console.log("Deposit Success:", depositSuccess);
console.log("Updated Account:", accountService.getAccount(account.id));

// Withdraw money
const withdrawSuccess = accountService.withdraw(account.id, 500);
console.log("Withdraw Success:", withdrawSuccess);
console.log("Updated Account:", accountService.getAccount(account.id));
