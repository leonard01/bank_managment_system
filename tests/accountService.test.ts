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
    expect(account.transactions).toEqual([]);
  });

  test("should get an account by id", () => {
    const account = accountService.createAccount("John Doe", "savings");
    const retrievedAccount = accountService.getAccount(account.id);
    expect(retrievedAccount).toEqual(account);
  });

  test("should deposit money into account and record transaction", () => {
    const account = accountService.createAccount("John Doe", "savings");
    const result = accountService.deposit(account.id, 1000);
    expect(result).toBe(true);
    expect(account.balance).toBe(1000);
    expect(account.transactions.length).toBe(1);
    expect(account.transactions[0].type).toBe("deposit");
    expect(account.transactions[0].amount).toBe(1000);
  });

  test("should withdraw money from account and record transaction", () => {
    const account = accountService.createAccount("John Doe", "savings");
    accountService.deposit(account.id, 1000);
    const result = accountService.withdraw(account.id, 500);
    expect(result).toBe(true);
    expect(account.balance).toBe(500);
    expect(account.transactions.length).toBe(2);
    expect(account.transactions[1].type).toBe("withdrawal");
    expect(account.transactions[1].amount).toBe(500);
  });

  test("should get transaction history for an account", () => {
    const account = accountService.createAccount("John Doe", "savings");
    accountService.deposit(account.id, 1000);
    accountService.withdraw(account.id, 500);
    const transactions = accountService.getAccountTransactions(account.id);
    expect(transactions.length).toBe(2);
    expect(transactions[0].type).toBe("deposit");
    expect(transactions[1].type).toBe("withdrawal");
  });

  test("should not withdraw money if insufficient balance", () => {
    const account = accountService.createAccount("John Doe", "savings");
    const result = accountService.withdraw(account.id, 500);
    expect(result).toBe(false);
    expect(account.balance).toBe(0);
    expect(account.transactions.length).toBe(0);
  });

  test("should delete an account", () => {
    const account = accountService.createAccount("Jane Doe", "checking");
    const result = accountService.deleteAccount(account.id);
    expect(result).toBe(true);
    expect(accountService.getAccount(account.id)).toBeUndefined();
  });

  test("should get all accounts", () => {
    accountService.createAccount("Jane Doe", "checking");
    accountService.createAccount("John Doe", "savings");
    const accounts = accountService.getAllAccounts();
    expect(accounts.length).toBe(2);
  });
});
