import { Component, OnInit, Input } from '@angular/core';

import {IGrid, ICardHost} from '../types'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['../grid.css']
})
export class GridComponent implements IGrid, OnInit {

  cardHosts: ICardHost[]= []
  // tslint:disable-next-line:no-inferrable-types
  columns: number= 5;
  // tslint:disable-next-line:no-inferrable-types
  rows: number= 5;
  rowHeight = 75;
  columnWidth = 75;
  cells = [];


  // tslint:disable-next-line:member-ordering
  newICard: ICardHost= {
    startingRow: 1,
    startingCol: 1,
    rowSpan: 2,
    colSpan: 2,
    label: 'test',
    gridarea: ''
  }
  constructor() { }

  addCardHost(cardHost: ICardHost): void {
    console.log(this.newICard)
    const ch = Object.assign({}, this.newICard)
    const startRow: number = +ch.startingRow
    const endRow: number = startRow + +ch.rowSpan
    const startCol: number = +ch.startingCol
    const endCol: number = startCol + + ch.colSpan

    // tslint:disable-next-line:no-unused-expression
    this.AdjustColumns(endCol)

    ch.gridarea = `${startRow} / ${startCol} / ${endRow} / ${endCol}`
    this.cardHosts.push(ch)
  }

  AdjustColumns(endCol: number) {
    let currentCols = this.columns
    const newColLength = endCol
    while (currentCols < newColLength ) {
      this.addColumn()
      currentCols++
    }
  }

  addColumn() {
    this.columns++
    const c = this.columns;
    for (let r = 1; r < this.rows + 1; r++ ) {
      this.cells.push({gridarea: `${r} / ${c} / ${r} / ${c}` })
    }
  }
  ngOnInit() {
    const tot = this.rows * this.columns
    for (let r = 1; r < this.rows + 1; r++ ) {
      for (let c = 1; c < this.columns + 1; c++ ) {
        this.cells.push({gridarea: `${r} / ${c} / ${r} / ${c}` })
      }
    }
  }
  clickCH(ch) {
    alert('clicked cardhost parent area' + JSON.stringify(ch))
  }
  dragover(evt) {
    console.log(evt)
  }
}
