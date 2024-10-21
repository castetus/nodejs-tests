// Uncomment the code below and write your tests
import { BankAccount, getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

const initialBalance = 100;

describe('BankAccount', () => {
  const bankAccount = getBankAccount(initialBalance);
  test('should create account with initial balance', () => {
    const result = bankAccount.getBalance();
    expect(result).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.withdraw(initialBalance + 1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    const newAccount = getBankAccount(0);
    expect(() => bankAccount.transfer(initialBalance + 1, newAccount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.transfer(1, bankAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.deposit(1);
    expect(bankAccount.getBalance()).toBe(initialBalance + 1);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(1);
    expect(bankAccount.getBalance()).toBe(initialBalance - 1);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(initialBalance);
    const newAccount = new BankAccount(0);
    bankAccount.transfer(initialBalance, newAccount);
    expect(bankAccount.getBalance()).toBe(0);
    expect(newAccount.getBalance()).toBe(initialBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = new BankAccount(initialBalance);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(75);

    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(75);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(80);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(80);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
