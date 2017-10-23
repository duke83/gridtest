import { Directive, Renderer2, ElementRef, OnInit, HostListener } from '@angular/core';
import { GridComponent } from "./grid/grid.component";
// import { Observable } from 'rxjs/Observable'

@Directive({
  selector: '[appCardHost]'
})
export class CardHostDirective implements OnInit {

  static dragging: boolean = false;
  static thisEl: any = ''
  static originalcssText: any = ''
  static originalGridArea: any = ''
  static originalHeight: any = ''
  static originalLeft: any = ''
  static originalWidth: any = ''
  static direction: string = ''
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'card-host-wrapper');
    const borderDivs = ['n', 'wnw', 'ene', 'w', 'e', 'wsw', 'ese', 'sw', 'ssw', 's', 'sse', 'se']
    borderDivs.forEach(d => {
      const newEl = this.renderer.createElement('div')
      this.renderer.addClass(newEl, d)
      this.renderer.appendChild(this.el.nativeElement, newEl)
    })
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    if (['e', 'ene', 's'].includes(event.srcElement.className)) {
      event.preventDefault()
      CardHostDirective.dragging = true
      CardHostDirective.thisEl = this.el.nativeElement
      CardHostDirective.originalcssText = CardHostDirective.thisEl.style.cssText
      CardHostDirective.originalGridArea = CardHostDirective.thisEl.style.gridArea
      CardHostDirective.originalHeight = CardHostDirective.thisEl.clientHeight
      CardHostDirective.originalLeft = CardHostDirective.thisEl.parentElement.offsetLeft //+ CardHostDirective.thisEl.offsetLeft
      CardHostDirective.originalWidth = CardHostDirective.thisEl.clientWidth
    }

    if (['e', 'ene'].includes(event.srcElement.className)) {
      CardHostDirective.dragging = true
      CardHostDirective.direction = 'e'
    }

    if (['s'].includes(event.srcElement.className)) {
      CardHostDirective.dragging = true
      CardHostDirective.direction = 's'
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (CardHostDirective.dragging && CardHostDirective.direction === 'e') {
      event.preventDefault()
      CardHostDirective.thisEl.style.position = 'absolute'
      CardHostDirective.thisEl.style.left = CardHostDirective.originalLeft + 'px'
      CardHostDirective.thisEl.style.height = CardHostDirective.originalHeight + 'px'
      CardHostDirective.thisEl.style.width = +event.screenX - +CardHostDirective.originalLeft + 'px'
    }
    if (CardHostDirective.dragging && CardHostDirective.direction === 's') {
      event.preventDefault()
      CardHostDirective.thisEl.style.position = 'absolute'
      // CardHostDirective.thisEl.style.left = CardHostDirective.originalLeft + 'px'
      CardHostDirective.thisEl.style.height = event.screenY - (+CardHostDirective.originalHeight + 75 ) + 'px'
      CardHostDirective.thisEl.style.width =  CardHostDirective.originalWidth + 'px'
    console.log(CardHostDirective.thisEl.style)
    }
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp(event) {
    CardHostDirective.thisEl.style.position = 'unset'
    CardHostDirective.thisEl.style.left = ''
    CardHostDirective.thisEl.style.height = ''
    CardHostDirective.thisEl.style.width = ''
    if (CardHostDirective.dragging && CardHostDirective.direction === 'e') {
      const newEndCol = this.getColFromXCoord(event.clientX);
      this.renderer.setStyle(CardHostDirective.thisEl, 'grid-area', `1 / 1 / 3 / ${newEndCol}`)
    }
    if (CardHostDirective.dragging && CardHostDirective.direction === 's') {
      const newEndRow = this.getRowFromYCoord(event.clientY);
      this.renderer.setStyle(CardHostDirective.thisEl, 'grid-area', this.changeGridAreaValue('rowEnd', newEndRow) )
    }
    CardHostDirective.dragging = false;
  }

  getColFromXCoord(x: number) {
    for (let i = 1; i < GridComponent.columns + 1; i++) {
      const cell = this.renderer.selectRootElement(`#cell-1-${i + 1}`)
      const rightX = cell.offsetLeft + cell.parentElement.offsetLeft // + cell.clientWidth
      if (rightX > x) {
        return i + 1 + 1 // because first column is the first cell's LEFT side, and because we want to capture partial overage
      }
    }
  }

  getRowFromYCoord(y: number) {
    for (let i = 1; i < GridComponent.rows + 1; i++) {
      const cell = this.renderer.selectRootElement(`#cell-${i + 1}-1`)
      const bottomY = cell.offsetTop + cell.clientHeight
      if (bottomY > y) {
        return i + 1 + 1 // because first column is the first cell's LEFT side, and because we want to capture partial overage
      }
    }
  }

  changeGridAreaValue(gridAreaSection: 'rowStart' | 'colStart' | 'rowEnd' | 'colEnd', newVal: number) {
    // newVal will be in the form of '1 / 2 / 1 / 2'
    const formattedNewval = ` ${newVal} `
    const valArray = CardHostDirective.originalGridArea.split('/') // .originalcssText.replace('grid-area:', '').replace(';', '').split('/')
    if (valArray.length !== 4) { throw Error('gridArea value should have 4 elements when evaluated here.') }
    switch (gridAreaSection) {
      case 'rowStart':
        valArray[0] = formattedNewval
        break
      case 'colStart':
        valArray[1] = formattedNewval
        break
      case 'rowEnd':
        valArray[2] = formattedNewval
        break
      case 'colEnd':
        valArray[3] = formattedNewval
        break
    }
    return valArray.join(' / ')
  }
}
