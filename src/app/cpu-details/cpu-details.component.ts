import { Component, OnInit } from '@angular/core';
import * as data from '../cpu-data.json';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cpu-details',
  templateUrl: './cpu-details.component.html',
  styleUrls: ['./cpu-details.component.css', '../tachyons/tachyons.min.css']
})
export class CpuDetailsComponent implements OnInit {
  cpublogs = (data as any).default;
  blogid = 0;
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.blogid = Number(routeParams.get('blogid'));
    console.log(this.blogid);
    window.scrollTo(0, 0);
  }
}
