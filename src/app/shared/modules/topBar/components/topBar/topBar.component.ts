import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { currentUserSelector, isAnonymousSelector, isLoggedInSelector } from "src/app/auth/store/selectors";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

@Component({
  selector: 'mc-topBar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.scss']
})

export class TopBarComponent implements OnInit{
  isLoggedIn$!: Observable<boolean>
  isAnonymous$!: Observable<boolean>
  currentUser$!: Observable<CurrentUserInterface | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
      this.isLoggedIn$ = this.store.pipe((select(isLoggedInSelector)) as any)
      this.isAnonymous$ = this.store.pipe((select(isAnonymousSelector)) as any)
      this.currentUser$ = this.store.pipe((select(currentUserSelector)) as any)
  }
}