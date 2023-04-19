import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { isSubmittingSelector, validationErrorsSelector } from 'src/app/auth/store/selectors'
import { AuthService } from "../../services/auth.service";
import { LoginRequestInterface } from "../../types/loginRequest.interface";
import { loginAction } from "../../store/actions/login.action";

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<any>

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe((select(isSubmittingSelector) as any))
    // console.log('isSubmitting$', this.isSubmitting$)
    this.backendErrors$ = this.store.pipe((select(validationErrorsSelector) as any))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    })
  }

  onSubmit(): void {
    console.log(this.form.value)
    const request: LoginRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}))
  }
}