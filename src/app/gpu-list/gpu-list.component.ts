import { Component, OnInit } from '@angular/core';
import * as data from '../gpu-data.json';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gpu-list',
  templateUrl: './gpu-list.component.html',
  styleUrls: ['./gpu-list.component.css', '../tachyons/tachyons.min.css'],
})
export class GpuListComponent implements OnInit {
  gpublogs = (data as any).default;
  constructor( private router: Router) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  navigate(): void {
    let x: string;
    // @ts-ignore
    x = document.getElementById('gpulist').value;
    const y = x.split(':');
    this.router.navigate(['/gpu/' + y[0]]);
  }
}
