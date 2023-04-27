import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PopularTagsService } from "src/app/shared/modules/popularTags/services/popularTags.service";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/shared/modules/popularTags/store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { GetPopularTagsEffect } from "src/app/shared/modules/popularTags/store/effects/getPopularTags.effect";
import { PopularTagsComponent } from "src/app/shared/modules/popularTags/components/popularTags/popularTags.component";
import { RouterModule } from "@angular/router";
import { LoadingModule } from "../loading/loading.module";
import { ErrorMessageModule } from "../errorMessage/error.message.module";

@NgModule({
  imports: [
    CommonModule, 
    StoreModule.forFeature('popularTags', reducers), 
    EffectsModule.forFeature([GetPopularTagsEffect]),
    RouterModule,
    LoadingModule,
    ErrorMessageModule
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService]
})
export class PopularTagsModule {}