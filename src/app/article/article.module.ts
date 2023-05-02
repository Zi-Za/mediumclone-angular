import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/article/store/reducers";
import { RouterModule } from "@angular/router";
import { ErrorMessageModule } from "src/app/shared/modules/errorMessage/error.message.module";
import { LoadingModule } from "src/app/shared/modules/loading/loading.module";
import { ArticleService as SharedArticleService } from "../shared/services/article.service";
import { GetArticleEffect } from "./store/effects/getArticle.effect";
import { ArticleComponent } from "./components/article/article.component";
import { TagListModule } from "../shared/modules/tagList/tagList.module";
import { ArticleService } from "./services/article.service";
import { DeleteArticleEffect } from "src/app/article/store/effects/deleteArticle.effect";

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
]

@NgModule({
  imports: [
    CommonModule, 
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]), 
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    RouterModule.forChild(routes),
    TagListModule
  ],
  declarations: [ArticleComponent],
  exports: [],
  providers: [SharedArticleService, ArticleService]
})
export class ArticleModule {}