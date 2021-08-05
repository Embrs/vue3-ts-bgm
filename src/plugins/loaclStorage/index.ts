import { encrypt, decrypt } from "./cryptoJS";
// encrypt:加密, decrypt:解密
const useHash = true;
interface AnyObject {
  [key: string]: any;
}

Storage.prototype.setHash = function (key: string, myObject: AnyObject) {
  if (useHash) {
    // 加密 key 與 data
    this.setItem(encrypt(key), encrypt(JSON.stringify(myObject)));
    return;
  }
  this.setItem(key, JSON.stringify(myObject));
};

Storage.prototype.getHash = function (key: string) {
  // 加密 key 取加密 data
  const myObject = useHash ? this.getItem(encrypt(key)) : this.getItem(key);
  if (!myObject) return null;
  if (useHash) {
    return decrypt(myObject) && JSON.parse(decrypt(myObject));
  }
  return myObject && JSON.parse(myObject);
};
