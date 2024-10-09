import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly secretKey = Buffer.from(process.env.ENCRYPTION_KEY || '20ccb0908d493709b33c40f2d3bde0c8cd39fe6b2f9d2594a71ed91d0e8aee73', 'hex');;
  private readonly iv = crypto.randomBytes(16);

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${this.iv.toString('hex')}:${encrypted.toString('hex')}`;
  }
}