import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { LookupModule } from './lookup/lookup.module';
import { LoginModule } from './login/login.module';
import { AppParameterModule } from './app-parameter/app-parameter.module';
import { SystemParameterModule } from './system-parameter/system-parameter.module';
import { AccessMatrixModule } from './access-matrix/access-matrix.module';
import { LookupGroupModule } from './lookup-group/lookup-group.module';
import { OnlyNumberModule } from './app-directive/only-number.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';
import { DriverModule } from './driver/driver.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { RegionalGroupModule } from './regional-group/regional-group.module';
import { RegionalModule } from './regional/regional.module';


@NgModule({
    imports: [
        UserModule,
        RoleModule,
        LookupModule,
        LoginModule,
        AppParameterModule,
        SystemParameterModule,
        AccessMatrixModule,
        LookupGroupModule,
        OnlyNumberModule,
        DashboardModule,
        CustomerModule,
        SellerModule,
        DriverModule,
        TransaksiModule,
        RegionalGroupModule,
        RegionalModule
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [],
    exports: []

})
export class EntityModule { }
