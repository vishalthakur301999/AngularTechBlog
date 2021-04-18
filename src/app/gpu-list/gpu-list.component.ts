import { Component, OnInit } from '@angular/core';
import * as data from '../gpu-data.json';

@Component({
  selector: 'app-gpu-list',
  templateUrl: './gpu-list.component.html',
  styleUrls: ['./gpu-list.component.css', '../tachyons/tachyons.min.css'],
})
export class GpuListComponent implements OnInit {
  gpublogs = (data as any).default;
  constructor() { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
