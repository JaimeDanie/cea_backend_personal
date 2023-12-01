import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Controller('')
export class SiteController {
  constructor(private readonly configService: ConfigService){}

  @Get()
  index(): string {
    return this.configService.get<string>('port')
  }
}