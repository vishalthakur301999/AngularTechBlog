import { Component } from '@angular/core';
import * as data from '../cpu-data.json';

@Component({
  selector: 'app-cpu-list',
  templateUrl: './cpu-list.component.html',
  styleUrls: ['./cpu-list.component.css', '../tachyons/tachyons.min.css']
})
export class CpuListComponent{
  cpublogs = (data as any).default;
}



