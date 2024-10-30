import { IsNotEmpty, IsUrl } from "class-validator";

export class ShortenUrlDto {
  @IsNotEmpty()
  @IsUrl()
  url!: string;
}