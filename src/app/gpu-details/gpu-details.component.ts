import { Component, OnInit } from '@angular/core';
import * as data from '../gpu-data.json';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-gpu-details',
  templateUrl: './gpu-details.component.html',
  styleUrls: ['./gpu-details.component.css', '../tachyons/tachyons.min.css']
})
export class GpuDetailsComponent implements OnInit {
  gpublogs = (data as any).default;
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
