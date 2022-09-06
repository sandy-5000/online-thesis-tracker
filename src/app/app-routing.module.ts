import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AadharAuthComponent } from './aadhar-auth/aadhar-auth.component';
import { AboutComponent } from './about/about.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NotAuthComponent } from './not-auth/not-auth.component';
import { RegisterComponent } from './register/register.component';
import { StatusComponent } from './status/status.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { UpdateDataComponent } from './update-data/update-data.component';

const routes: Routes = [
  { path : '', redirectTo : "/home", pathMatch : "full" },
  { path : 'home', component : HomeComponent },
  { path : 'login', component : LoginComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'InvalidUser', component : NotAuthComponent },
  { path : 'aadharAuthentication', component : AadharAuthComponent },
  { path : 'status', component : StatusComponent },
  { path : 'SupervisorLogin', component : SupervisorComponent },
  { path : 'Admin', component : AdminComponent },
  { path : 'About', component : AboutComponent },
  { path : 'forgotPassword', component : ForgotPasswordComponent },
  { path : 'update', component : UpdateDataComponent },
  { path : 'admin_portal', component : AdminPortalComponent },
  { path : 'NewUser', component : NewUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
