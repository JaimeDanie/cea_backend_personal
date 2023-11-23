import { ConfigService } from "@nestjs/config"

const configService = new ConfigService()

export const jwt = {
  secret: configService.get("JWT_SECRET")
}