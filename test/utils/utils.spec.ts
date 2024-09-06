import { Utils } from "../../src/utils/utils";

describe("Utils", () => {
  describe("generateUUID", () => {
    it("should generate a valid UUID", () => {
      const uuid = Utils.generateUUID();

      expect(uuid).toMatch(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      );
    });

    it("should generate a different UUID each time", () => {
      const uuid1 = Utils.generateUUID();
      const uuid2 = Utils.generateUUID();

      expect(uuid1).not.toBe(uuid2);
    });
  });
});
