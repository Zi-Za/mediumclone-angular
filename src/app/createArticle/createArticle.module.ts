import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CreateArticleComponent } from "src/app/createArticle/components/createArticle/createArticle.component";
import { RouterModule } from "@angular/router";
import { ArticleFormModule } from "../shared/modules/articleForm/articleForm.module";
import { CreateArticleService } from "./services/createArticle.service";
import { EffectsModule } from "@ngrx/effects";
import { CreateArticleEffect } from "./store/effects/createArticle.effect";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/createArticle/store/reducers";

const routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent
  }
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    ArticleFormModule, 
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', reducers)
  ],
  declarations: [CreateArticleComponent],
  providers: [CreateArticleService]
})
export class CreateArticleModule {}
