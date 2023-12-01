import { Module } from "@nestjs/common";
import { SiteController } from "./controllers/site.controller";

@Module({
  controllers: [SiteController]
})
export class SiteModule {}