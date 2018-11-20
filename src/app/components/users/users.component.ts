import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs/Subject';
import { MatDialog } from '@angular/material';
import { InvoiceDataComponent } from './invoice-data/invoice-data.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: any;
  public query: string;
  private searchSubject = new Subject<string>();
  public identities = ['email', 'facebook', 'twitter', 'google'];

  constructor(private us: UserService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.initUsers();
    this.searchSubject
      .debounceTime(500)
      .subscribe(query => this.makeSearch(query));
  }

  private async initUsers() {
    this.users = await this.us.getUsers();
    console.log(this.users);
  }

  public onSearch() {
    this.searchSubject.next(this.query);
  }

  private async makeSearch(query: string) {
    this.users = await this.us.getUsers(null, query);
  }

  public showInvoiceData(invoiceData: any) {
    this.dialog.open(InvoiceDataComponent, {
      data: invoiceData
    });
  }

}
