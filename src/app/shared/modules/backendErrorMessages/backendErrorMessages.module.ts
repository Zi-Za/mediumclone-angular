import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BackendErrorMessagesComponent } from "src/app/shared/modules/backendErrorMessages/components/backendErrorMessages/backendErrorMessages.component";

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorMessagesComponent],
  exports: [BackendErrorMessagesComponent]
})

export class BackendErrorMessagesModule {}