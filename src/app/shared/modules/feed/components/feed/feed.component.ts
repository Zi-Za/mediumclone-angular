import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { getFeedAction } from "../../store/actions/getFeed.action";
import { Observable } from "rxjs";
import { GetFeedResponseInterface } from "src/app/shared/modules/feed/types/getFeedResponse.interface";
import { errorSelector, feedSelector, isLoadingSelector } from "../../store/selectors";

@Component({
  selector: 'mc-feed',
  templateUrl: '/feed.component.html',
  styleUrls: ['/feed.component.scss']
})
export class FeedComponent implements OnInit{
  @Input('apiUrl') apiUrlProps!: string

  isLoading$!: Observable<boolean>
  error$!: Observable<string | null>
  feed$!: Observable<GetFeedResponseInterface | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe((select(isLoadingSelector)) as any)
    this.error$ = this.store.pipe((select(errorSelector)) as any)
    this.feed$ = this.store.pipe((select(feedSelector)) as any)
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({url: this.apiUrlProps}))
  }
}

