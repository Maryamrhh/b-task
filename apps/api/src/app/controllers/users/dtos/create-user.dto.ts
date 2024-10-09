// dto/create-user.dto.ts
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 12)
  @Matches(/^[!@1234567890._]+$/, {
    message: 'Username can only contain !@1234567890._ characters.',
  })
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one capital letter and one number.',
  })
  password!: string;
}
