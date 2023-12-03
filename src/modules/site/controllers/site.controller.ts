import { Controller, Get } from "@nestjs/common";

@Controller('')
export class SiteController {
  constructor(){}

  @Get()
  index(): string {
    return "API is alive"
  }
}