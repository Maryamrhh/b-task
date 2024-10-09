import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class DecryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly secretKey = Buffer.from(process.env.ENCRYPTION_KEY || '20ccb0908d493709b33c40f2d3bde0c8cd39fe6b2f9d2594a71ed91d0e8aee73', 'hex');;

decrypt(encryptedText: string): string {
  const [iv, encrypted] = encryptedText.split(':');
  if (!this.secretKey) {
    throw new Error('Secret key is not defined');
  }
  const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(iv, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);
  return decrypted.toString();
}
}