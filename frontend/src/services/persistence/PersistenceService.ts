export class PersistenceService {

  private localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  public get(key: string): string | null {
    if (typeof key !== "string") {
      throw new Error("Value must be a string");
    }

    return this.localStorage.getItem(key);
  }

  public set(key: string, value: string): void {
    if (typeof key !== "string") {
      throw new Error("Key must be a string");
    }
    if (typeof value !== "string") {
      throw new Error("Value must be a string");
    }

    this.localStorage.setItem(key, value);
  }

  public remove(key: string): void {
    if (typeof key !== "string") {
      throw new Error("Key must be a string");
    }

    this.localStorage.removeItem(key);
  }
}
