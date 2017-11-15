import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  user: User;
  islogg: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    // this.auth.getUser().then(user => this.user = user);
  }

}
