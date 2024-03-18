import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Healt")
@Controller('health')
export class SiteController {
  constructor() { }

  @Get()
  index(): string {
    return "API is alive"
  }
}