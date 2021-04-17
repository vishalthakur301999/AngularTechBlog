import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './tachyons/tachyons.min.css']
})
export class AppComponent implements OnInit{
  title = 'techblog';
  constructor() { }
  ngOnInit(): void {
  }
}
