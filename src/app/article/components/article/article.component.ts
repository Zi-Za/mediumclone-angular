import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable, Subscription, combineLatest, map } from "rxjs";
import { getArticleAction } from "src/app/article/store/actions/getArticle.action";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { 
  articleSelector, 
  errorSelector, 
  isLoadingSelector 
} from "src/app/article/store/selectors";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { currentUserSelector } from "src/app/auth/store/selectors";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { deleteArticleAction } from "../../store/actions/deleteArticle.action";

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit, OnDestroy {
  slug: string | null = null;
  article: ArticleInterface | null = null;
  articleSubscription!: Subscription;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  isAuthor$!: Observable<boolean>

  constructor(private store: Store<AppStateInterface>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializedValues()
    this.initializeListeners()
    this.fetchData()
  }

  ngOnDestroy(): void {
      this.articleSubscription.unsubscribe()
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe((select(articleSelector)))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article
      })
  }

  initializedValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isLoading$ = this.store.pipe((select(isLoadingSelector)))
    this.error$ = this.store.pipe((select(errorSelector)))
    this.isAuthor$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null, 
          CurrentUserInterface | null
        ]) => {
          if (!article || !currentUser) {
            return false
          }
          return currentUser.username === article.author.username
        }
      )
    )
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}))
  }
}

