import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { getFeedAction } from "../../store/actions/getFeed.action";
import { Observable, Subscription } from "rxjs";
import { GetFeedResponseInterface } from "src/app/shared/modules/feed/types/getFeedResponse.interface";
import { errorSelector, feedSelector, isLoadingSelector } from "../../store/selectors";
import { environment } from "src/environments/environment";
import { ActivatedRoute, Params, Router } from "@angular/router";
import queryString from 'query-string'
 
@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps!: string

  isLoading$!: Observable<boolean>
  error$!: Observable<string | null>
  feed$!: Observable<GetFeedResponseInterface | null>
  limit = environment.limit
  baseUrl!: string
  queryParamsSubscription!: Subscription
  currentPage!: number

  constructor(
    private store: Store, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    console.log('initialized feed')
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged = 
      !changes['apiUrlProps'].firstChange && 
      changes['apiUrlProps'].currentValue !== changes['apiUrlProps'].previousValue
    if (isApiUrlChanged) {
      this.fetchFeed()
    }
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe((select(isLoadingSelector)) as any)
    this.error$ = this.store.pipe((select(errorSelector)) as any)
    this.feed$ = this.store.pipe((select(feedSelector)) as any)
    this.baseUrl = this.router.url.split('?')[0]
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page']|| '1')
        console.log('currentPage', this.currentPage)
        this.fetchFeed()
      }
    )
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = queryString.parseUrl(this.apiUrlProps)
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
  }
}

