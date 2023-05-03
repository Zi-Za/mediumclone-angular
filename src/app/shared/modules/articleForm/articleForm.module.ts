import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ArticleFormComponent } from "./components/articleForm/articleForm.component";
import { ReactiveFormsModule } from "@angular/forms";
import { BackendErrorMessagesModule } from "../backendErrorMessages/backendErrorMessages.module";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesModule],
  declarations: [ArticleFormComponent],
  exports: [ArticleFormComponent]
})
export class ArticleFormModule {}