import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CreateArticleComponent } from "src/app/createArticle/components/createArticle/createArticle.component";
import { RouterModule } from "@angular/router";
import { ArticleFormModule } from "../shared/modules/articleForm/articleForm.module";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/editArticle/store/reducers";
import { EditArticleService } from "./services/editArticle.service";
import { ArticleService as SharedArticleService } from "../shared/services/article.service";
import { GetArticleEffect } from "src/app/editArticle/store/effects/getArticle.effect";
import { UpdateArticleEffect } from "./store/effects/updateArticle.effect";
import { LoadingModule } from "../shared/modules/loading/loading.module";
import { EditArticleComponent } from "./component/editArticle/editArticle.component";

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent
  }
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    ArticleFormModule, 
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService]
})
export class EditArticleModule {}