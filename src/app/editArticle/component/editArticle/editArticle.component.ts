import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, filter, map } from "rxjs";
import { ArticleInputInterface } from "src/app/shared/types/articleInput.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { 
  articleSelector, 
  isSubmittingSelector, 
  validationErrorsSelector 
} from "../../store/selectors";
import { ActivatedRoute } from "@angular/router";
import { getArticleAction } from "../../store/actions/getArticle.action";
import { updateArticleAction } from "../../store/actions/updateArticle.action";


@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html'
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleInputInterface> 
  isSubmitting$: Observable<boolean>
  isLoading$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>
  slug: string 

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') as any;
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector as any))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector as any))
    this.initialValues$ = (this.store.pipe(
      select(articleSelector as any), 
      filter(Boolean), 
      map((article: any) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList
      }
    })) as Observable<ArticleInputInterface>)
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({articleInput, slug: this.slug}))
  }
}