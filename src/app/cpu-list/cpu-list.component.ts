import {Component, OnInit} from '@angular/core';
import * as data from '../cpu-data.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cpu-list',
  templateUrl: './cpu-list.component.html',
  styleUrls: ['./cpu-list.component.css', '../tachyons/tachyons.min.css']
})
export class CpuListComponent implements OnInit{
  cpublogs = (data as any).default;
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  navigate(): void {
    let x: string;
    // @ts-ignore
    x = document.getElementById('cpulist').value;
    const y = x.split(':');
    this.router.navigate(['/cpu/' + y[0]]);
  }
}



