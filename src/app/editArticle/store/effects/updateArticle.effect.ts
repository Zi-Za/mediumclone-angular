import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { 
  updateArticleAction, 
  updateArticleFailureAction, 
  updateArticleSuccessAction 
} from "../actions/updateArticle.action";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { EditArticleService } from "../../services/editArticle.service";


@Injectable()
export class UpdateArticleEffect {
  updateArticle$ = createEffect(() => 
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({articleInput, slug}) => {
        return this.editArticleService.updateArticle(slug, articleInput).pipe(
          map((article: ArticleInterface) => {
            return updateArticleSuccessAction({article})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateArticleFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )

  redirectAfterUpdate$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({article}) => {
          this.router.navigate(['/articles', article.slug])
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions, 
    private editArticleService: EditArticleService, 
    private router:Router
  ) {}
}