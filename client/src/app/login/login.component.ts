import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None  // or ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
