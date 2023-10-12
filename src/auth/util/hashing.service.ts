import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashingService {
  hash = async (password: string, salts = 10): Promise<string> => {
    return await bcrypt.hash(password, salts);
  };
  compare = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
  };
}
