import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(100000)
  @Max(999999)
  otp!: number
}