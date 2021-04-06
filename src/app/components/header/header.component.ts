import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName: string;
  private authSub: Subscription;
  private userSub: Subscription;
  constructor(
    private router: Router) { }

  ngOnInit(): void {

  }
}
