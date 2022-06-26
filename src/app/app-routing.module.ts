import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './entities/login/login.component';
import { Page404Component } from './err/page404/page404.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './entities/user/user.component';
import { RoleComponent } from './entities/role/role.component';

import { LookupComponent } from './entities/lookup/lookup.component';
import { SystemParameterComponent } from './entities/system-parameter/system-parameter.component';
import { AccessMatrixComponent } from './entities/access-matrix/access-matrix.component';

import { DashboardComponent } from './entities/dashboard/dashboard.component';
import { CustomerComponent } from './entities/customer/customer.component';
import { SellerComponent } from './entities/seller/seller.component';
import { DriverComponent } from './entities/driver/driver.component';
import { NewTransaksiComponent } from './entities/transaksi/new-transaksi/new-transaksi.component';
import { RegionalGroupComponent } from './entities/regional-group/regional-group.component';
import { RegionalComponent } from './entities/regional/regional.component';



const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'main', component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    // { path: '', loadChildren: ()=> DashboardModule  },
                    { path: '', component: DashboardComponent  },
                    { path: '404', component: Page404Component },
                    { path: 'seller', component: SellerComponent },
                    { path: 'customer', component: CustomerComponent },
                    { path: 'driver', component: DriverComponent },
                    { path: 'user', component: UserComponent },
                    { path: 'regional-group', component: RegionalGroupComponent },
                    { path: 'regional', component: RegionalComponent },
                    { path: 'transaksi', component: NewTransaksiComponent },
                    { path: 'lookup', component: LookupComponent },
                    { path: 'role', component: RoleComponent },
                    { path: 'system-parameter', component: SystemParameterComponent },
                    { path: 'access-matrix', component: AccessMatrixComponent },
                    { path: '**', component: Page404Component },
                ]
            }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
