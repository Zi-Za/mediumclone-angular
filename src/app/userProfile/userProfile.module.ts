import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserProfileComponent } from "src/app/userProfile/components/userProfile/userProfile.component";
import { RouterModule } from "@angular/router";
import { UserProfileService } from "src/app/userProfile/services/userProfile.service";
import { EffectsModule } from "@ngrx/effects";
import { GetUserProfileEffect } from "./store/effects/getUserProfile.effect";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/userProfile/store/reducers";
import { FeedModule } from "../shared/modules/feed/feed.module";

const routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent
  }
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducers),
    FeedModule
  ],
  declarations: [UserProfileComponent],
  providers: [UserProfileService]
})
export class UserProfileModule {}