import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../category-list/loader.service.service';
import { AccountService } from './account.service';
import { Account } from '../models/account';
import { accountType } from '../models/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit, OnDestroy {
  accountSubscription: Subscription;
  types = this.enumSelector(accountType);

  constructor(public accountService: AccountService, public loaderService: LoaderService) {}

  ngOnInit() {
    this.accountSubscription = this.accountService.getAccounts().subscribe(accounts => {
      this.accountService.accounts = accounts;
    });
  }

  deleteAccount(account: Account) {
    let index: number = this.accountService.accounts.indexOf(account);
    this.accountService.accounts.splice(index, 1);

    this.accountService.deleteAccount(account).subscribe();
  }

  ngOnDestroy() {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

  enumSelector(definition) {
    return Object.keys(definition).map(key => ({ value: definition[key], title: key }));
  }
}
