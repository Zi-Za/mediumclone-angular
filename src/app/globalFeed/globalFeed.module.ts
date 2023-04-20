import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GlobalFeedComponent } from "src/app/globalFeed/components/globalFeed/globalFeed.component";
import { RouterModule } from "@angular/router";
import { FeedModule } from "src/app/shared/modules/feed/feed.module";

const routes = [
  {
    path: '',
    component: GlobalFeedComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FeedModule],
  declarations: [GlobalFeedComponent]
})
export class GlobalFeedModule {}