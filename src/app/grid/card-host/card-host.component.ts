import { Component, OnInit } from '@angular/core';
import { ICardHost } from '../types/index';

@Component({
  selector: 'app-card-host',
  templateUrl: './card-host.component.html',
  styleUrls: ['../grid.css', './card-host.component.css']
})
export class CardHostComponent implements ICardHost, OnInit {
  startingRow: number;
  startingCol: number;
  rowSpan: number;
  colSpan: number;
  label: string;
  gridarea: string;

  constructor() { }

  ngOnInit() {
  }

  clickCardHost() {
    alert('test')
  }
}
