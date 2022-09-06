import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { NotAuthComponent } from './not-auth/not-auth.component';
import { FormsModule } from '@angular/forms';
import { AadharAuthComponent } from './aadhar-auth/aadhar-auth.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusComponent } from './status/status.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { AdminComponent } from './admin/admin.component';
import { AboutComponent } from './about/about.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ExcelComponent } from './excel/excel.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
		LoginComponent,
		FooterComponent,
		RegisterComponent,
		NotAuthComponent,
		AadharAuthComponent,
		StatusComponent,
		SupervisorComponent,
		AdminComponent,
		AboutComponent,
		ForgotPasswordComponent,
		ExcelComponent,
		AdminFormComponent,
  UpdateDataComponent,
  AdminPortalComponent,
  NewUserComponent,
	],
	imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
