import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FeedComponent } from "./components/feed/feed.component";
import { EffectsModule } from "@ngrx/effects";
import { GetFeedEffect } from "src/app/shared/modules/feed/store/effects/getFeed.effect";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/shared/modules/feed/store/reducers";
import { FeedService } from "src/app/shared/modules/feed/services/feed.service";
import { RouterModule } from "@angular/router";
import { ErrorMessageModule } from "src/app/shared/modules/errorMessage/error.message.module";
import { LoadingModule } from "../loading/loading.module";

@NgModule({
  imports: [
    CommonModule, 
    EffectsModule.forFeature([GetFeedEffect]), 
    StoreModule.forFeature('feed', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule
  ],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule {}