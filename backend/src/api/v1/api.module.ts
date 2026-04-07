import { Module } from '@nestjs/common';
import { RequestModule } from './requests/request.module';

@Module({
    imports: [RequestModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class ApiModule {}
