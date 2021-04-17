import { Component, OnInit } from '@angular/core';
import * as data from '../cpu-data.json';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cpu-details',
  templateUrl: './cpu-details.component.html',
  styleUrls: ['./cpu-details.component.css']
})
export class CpuDetailsComponent implements OnInit {
  cpublogs = (data as any).default;
  cpublog: any;
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const blogid = Number(routeParams.get('blogid'));
    this.cpublog = this.cpublogs.find(() => this.cpublogs.id === blogid);
  }
}
