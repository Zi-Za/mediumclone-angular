import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { RegisterComponent } from "src/app/auth/components/register/register.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [RegisterComponent]
})
export class AuthModule {}