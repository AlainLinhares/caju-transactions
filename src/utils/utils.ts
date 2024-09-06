import { v4 as uuidv4 } from "uuid";

export class Utils {
  static generateUUID() {
    let uuid = uuidv4();
    return uuid;
  }
}
