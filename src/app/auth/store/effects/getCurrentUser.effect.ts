import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { 
  getCurrentUserAction, 
  getCurrentUserFailureAction, 
  getCurrentUserSuccessAction 
} from "../actions/getCurrentUser";
import { AuthService } from "src/app/auth/services/auth.service";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { PersistanceService } from "src/app/shared/services/persistance.service";

@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get('accessToken')
        if (!token) {
          return of(getCurrentUserFailureAction())
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({currentUser})
          }),
          catchError(() => {
            return of(
              getCurrentUserFailureAction()
            )
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions, 
    private authService: AuthService, 
    private persistanceService: PersistanceService,
  ) {}
}