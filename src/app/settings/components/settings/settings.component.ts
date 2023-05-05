import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable, Subscription, filter } from "rxjs";
import { currentUserSelector } from "src/app/auth/store/selectors";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { isSubmittingSelector, validationErrorsSelector } from "src/app/settings/store/selectors";
import { updateCurrentUserAction } from "src/app/auth/store/actions/updateCurrentUser.action";
import { CurrentUserInputInterface } from "src/app/shared/types/currentUserInput.interface";
import { logoutAction } from "src/app/auth/store/actions/sync.action";

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface
  currentUserSubscription: Subscription
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe((select(isSubmittingSelector)) as any)
    this.backendErrors$ = this.store.pipe((select(validationErrorsSelector)) as any)
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: ''
    })
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector as any ), filter(Boolean))
      .subscribe((currentUser: any) => {
        this.currentUser = currentUser
        this.initializeForm()
      })
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value
    }
    this.store.dispatch(updateCurrentUserAction({currentUserInput}))
  }

  logout(): void {
    this.store.dispatch(logoutAction())
  }
}