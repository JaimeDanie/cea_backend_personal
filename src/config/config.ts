import { ConfigModule, ConfigModuleOptions, ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"

ConfigModule.forRoot({
  envFilePath: `.development.env`,
})
const configService = new ConfigService()

export const appConfig: ConfigModuleOptions = {
  envFilePath: './.development.env',
  isGlobal: true,
}