import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "src/types/jwt-payload";

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.sub;
  }
)