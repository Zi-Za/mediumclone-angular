import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/shared/modules/feed/store/reducers";
import { RouterModule } from "@angular/router";
import { ErrorMessageModule } from "src/app/shared/modules/errorMessage/error.message.module";
import { LoadingModule } from "src/app/shared/modules/loading/loading.module";
import { ArticleService as SharedArticleService } from "../shared/services/article.service";
import { GetArticleEffect } from "./store/effects/getArticle.effect";

@NgModule({
  imports: [
    CommonModule, 
    EffectsModule.forFeature([GetArticleEffect]), 
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule
  ],
  declarations: [],
  exports: [],
  providers: [SharedArticleService]
})
export class ArticleModule {}