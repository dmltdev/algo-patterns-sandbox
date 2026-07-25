import { HashMap } from "./HashMap";
import { describe, it, expect, beforeEach } from "vitest";

describe("Hash Map", () => {
  let hashMap: HashMap;

  beforeEach(() => {
    hashMap = new HashMap();
  });

  describe("hashStr", () => {
    it("should return consistent hash for the same input", () => {
      const hash1 = hashMap.hashStr("key");
      const hash2 = hashMap.hashStr("key");
      expect(hash1).toBe(hash2);
    });

    it("should return different hashes for different inputs", () => {
      const hash1 = hashMap.hashStr("key1");
      const hash2 = hashMap.hashStr("key2");
      expect(hash1).not.toBe(hash2);
    });
  });

  describe("set and get", () => {
    it("should set and get a value", () => {
      hashMap.set("key1", 100);
      expect(hashMap.get("key1")).toBe(100);
    });

    it("should return undefined for a key that doesn't exist", () => {
      expect(hashMap.get("nonExistingKey")).toBeUndefined();
    });

    it("should handle collision and store multiple values", () => {
      hashMap.set("key1", 100);
      hashMap.set("key2", 200);
      expect(hashMap.get("key1")).toBe(100);
      expect(hashMap.get("key2")).toBe(200);
    });

    it("should update value for the existing key", () => {
      hashMap.set("key1", 100);
      hashMap.set("key1", 200);
      expect(hashMap.get("key1")).toBe(200);
    });
  });

  describe("clear", () => {
    it("should clear the HashMap", () => {
      hashMap.set("key1", 100);
      hashMap.clear();
      expect(hashMap.isEmpty()).toBe(true);
    });
  });

  describe("isEmpty", () => {
    it("should be empty initially", () => {
      expect(hashMap.isEmpty()).toBe(true);
    });

    it("should not be empty after adding elements", () => {
      hashMap.set("key1", 100);
      expect(hashMap.isEmpty()).toBe(false);
    });

    it("should be empty after clearing", () => {
      hashMap.set("key1", 100);
      hashMap.clear();
      expect(hashMap.isEmpty()).toBe(true);
    });
  });
});
