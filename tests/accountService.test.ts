// tests/accountService.test.ts

import { AccountService } from "../src/services/accountService";

describe("AccountService", () => {
  let accountService: AccountService;

  beforeEach(() => {
    accountService = new AccountService();
  });

  test("should create a new account", () => {
    const account = accountService.createAccount("Jane Doe", "checking");
    expect(account).toHaveProperty("id");
    expect(account.owner).toBe("Jane Doe");
    expect(account.balance).toBe(0);
    expect(account.type).toBe("checking");
  });

  test("should deposit money into account", () => {
    const account = accountService.createAccount("John Doe", "savings");
    accountService.deposit(account.id, 1000);
    expect(account.balance).toBe(1000);
  });

  test("should withdraw money from account", () => {
    const account = accountService.createAccount("John Doe", "savings");
    accountService.deposit(account.id, 1000);
    accountService.withdraw(account.id, 500);
    expect(account.balance).toBe(500);
  });
});
