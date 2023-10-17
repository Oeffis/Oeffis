/* eslint-disable @typescript-eslint/no-explicit-any */
import { PersistenceService } from "./PersistenceService";

test("can write to persistence service", () => {
  const service = new PersistenceService();
  service.set("test", "test");
  expect(service.get("test")).toBe("test");
});

test("returns null if key does not exist", () => {
  const service = new PersistenceService();
  expect(service.get("test_null")).toBeNull();
});

test("fails if key is an integer", () => {
  const service = new PersistenceService();
  expect(() => { service.set(1 as unknown as string, "test"); }).toThrowError();
});

test("fails if value is an integer", () => {
  const service = new PersistenceService();
  expect(() => { service.set("test", 1 as unknown as string); }).toThrowError();
});

test("fails if key is an object", () => {
  const service = new PersistenceService();
  expect(() => { service.set({} as unknown as string, "test"); }).toThrowError();
});

test("fails if value is an object", () => {
  const service = new PersistenceService();
  expect(() => { service.set("test", {} as unknown as string); }).toThrowError();
});
