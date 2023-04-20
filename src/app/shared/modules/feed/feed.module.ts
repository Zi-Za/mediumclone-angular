import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FeedComponent } from "./components/feed/feed.component";
import { EffectsModule } from "@ngrx/effects";
import { GetFeedEffect } from "./store/effects/getFeed.effect";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/shared/modules/feed/store/reducers";
import { FeedService } from "./services/feed.service";

@NgModule({
  imports: [
    CommonModule, 
    EffectsModule.forFeature([GetFeedEffect]), 
    StoreModule.forFeature('feed', reducers)
  ],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule {}