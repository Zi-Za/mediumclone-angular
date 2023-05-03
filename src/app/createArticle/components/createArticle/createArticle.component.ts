import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { ArticleInputInterface } from "src/app/shared/types/articleInput.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { isSubmittingSelector, validationErrorsSelector } from "../../store/selectors";
import { createArticleAction } from "../../store/actions/createArticle.action";

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html'
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
      this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector as any))
      this.backendErrors$ = this.store.pipe(select(validationErrorsSelector as any))
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({articleInput}))
  }
}