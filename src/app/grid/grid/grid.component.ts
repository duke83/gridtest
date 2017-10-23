import { Component, OnInit, Input, HostListener } from '@angular/core';
// import { Observable } from 'rxjs/Observable'
import { IGrid, IGridCell, ICardHost } from '../types'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['../grid.css']
})
export class GridComponent implements IGrid, OnInit {


  // tslint:disable-next-line:no-inferrable-types
  static columns: number = 10;
  // tslint:disable-next-line:no-inferrable-types

  static rows: number = 5;
  columns = GridComponent.columns
  rows = GridComponent.rows
  cardHosts: ICardHost[] = []
  rowHeight = 75;
  columnWidth = 75;
  cells= [];

  dragging = false


  // tslint:disable-next-line:member-ordering
  newICard: ICardHost = {
    id: 0,
    startingRow: 1,
    startingCol: 1,
    rowSpan: 2,
    colSpan: 2,
    label: 'test',
    gridarea: ''
  }
  constructor() { }

  addCardHost(cardHost: ICardHost): void {
    const ch = Object.assign({}, this.newICard)
    const allIds = this.cardHosts.map((m) => m.id)
    if (allIds.length > 0) {
      const newid = allIds.reduce((a, b) => Math.max(a, b)) + 1
      ch.id = newid
    }
    const startRow: number = +ch.startingRow
    const endRow: number = startRow + +ch.rowSpan
    const startCol: number = +ch.startingCol
    const endCol: number = startCol + + ch.colSpan

    this.AdjustColumns(endCol)
    this.adjustRows(endRow)
    ch.gridarea = `${startRow} / ${startCol} / ${endRow} / ${endCol}`
    this.cardHosts.push(ch)
  }

  AdjustColumns(endCol: number) {
    let currentCols = GridComponent.columns
    const newColLength = endCol
    while (currentCols < newColLength) {
      this.addColumn()
      currentCols++
    }
  }

  adjustRows(endRow: number) {
    let currentRows = GridComponent.rows
    const newRowLength = endRow
    while (currentRows < newRowLength) {
      this.addRow()
      currentRows++
    }
  }

  addColumn() {
    GridComponent.columns++
    const c = GridComponent.columns;
    for (let r = 1; r < GridComponent.rows + 1; r++) {
      this.cells.push({rowStart: r, rowEnd: r, colStart: c, colEnd: c, gridarea: `${r} / ${c} / ${r} / ${c}` })
    }
  }

  addRow() {
    GridComponent.rows++
    const rw = GridComponent.rows;
    for (let c = 1; c < GridComponent.columns + 1; c++) {
      this.cells.push({rowStart: rw, rowEnd: rw, colStart: c, colEnd: c, gridarea: `${rw} / ${c} / ${rw} / ${c}` })
    }
  }

  ngOnInit() {
   // this.cells=new Array<IGridCell>();
    const tot = GridComponent.rows * GridComponent.columns
    for (let r = 1; r < GridComponent.rows + 1; r++) {
      for (let c = 1; c < GridComponent.columns + 1; c++) {
        this.cells.push({rowStart: r, rowEnd: r, colStart: c, colEnd: c, gridarea: `${r} / ${c} / ${r} / ${c}` })
      }
    }
  }

}
