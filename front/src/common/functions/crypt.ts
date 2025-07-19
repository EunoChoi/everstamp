import CryptoJS from 'crypto-js';

/**
 * 문자열 AES 알고리즘 암호화
 * @param content 암호화할 문자열
 * @param secretKey 비밀 키
 * @returns 암호화된 문자열
 */
export const encrypt = (content: string, secretKey: string): string => {
  return CryptoJS.AES.encrypt(content, secretKey).toString();
};

/**
 * 암호화된 문자열 AES 알고리즘 복호화
 * @param encryptedContent 암호화된 문자열
 * @param secretKey 비밀 키
 * @returns 복호화된 문자열
 */
export const decrypt = (encryptedContent: string, secretKey: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedContent, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};