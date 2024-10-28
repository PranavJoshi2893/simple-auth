import { IsAlpha, IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class UserRegisterDTO {
  @IsNotEmpty()
  @IsAlpha()
  firstName!: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    {
      message:
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }
  )
  password!: string;
}

export class UserLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    {
      message:
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }
  )
  password!: string;
}
