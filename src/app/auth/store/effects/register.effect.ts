import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";

import { 
  registerAction, 
  registerFailureAction, 
  registerSuccessAction 
} from "src/app/auth/store/actions/register.action";
import { AuthService } from "src/app/auth/services/auth.service";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { Router } from "@angular/router";

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() => 
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token)
            return registerSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(() => 
    this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() => {
        console.log('succ')
        this.router.navigateByUrl('/')
      })
  ))

  constructor(
    private actions$: Actions, 
    private authService: AuthService, 
    private persistanceService: PersistanceService,
    private router:Router
  ) {}
}