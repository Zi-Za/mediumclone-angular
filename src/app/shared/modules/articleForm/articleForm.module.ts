import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ArticleFormComponent } from "./components/articleForm/articleForm.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ArticleFormComponent],
  exports: [ArticleFormComponent]
})
export class ArticleFormModule {}