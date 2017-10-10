import { Directive, Renderer2, ElementRef, OnInit, HostListener } from '@angular/core';
// import { Observable } from 'rxjs/Observable'

@Directive({
  selector: '[appCardHost]'
})
export class CardHostDirective implements OnInit {
  static dragging: boolean = false;
  static thisEl: any = ''
  static originalcssText: any = ''
  static originalHeight: any = ''
  static originalLeft: any = ''
  static originalWidth: any = ''
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
    if (['e', 'ene'].includes(event.srcElement.className)) {
      CardHostDirective.dragging = true
      CardHostDirective.thisEl = this.el.nativeElement
      CardHostDirective.originalcssText = CardHostDirective.thisEl.style.cssText
      CardHostDirective.originalHeight = CardHostDirective.thisEl.clientHeight
      CardHostDirective.originalLeft = CardHostDirective.thisEl.offsetLeft
      CardHostDirective.originalWidth = CardHostDirective.thisEl.clientWidth
    }
  }


  @HostListener('window:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (CardHostDirective.dragging) {
      CardHostDirective.thisEl.style.position = 'absolute'
      CardHostDirective.thisEl.style.left = CardHostDirective.originalLeft + 'px'
      CardHostDirective.thisEl.style.height = CardHostDirective.originalHeight + 'px'
      CardHostDirective.thisEl.style.width = +event.screenX - +CardHostDirective.originalLeft + 'px'
    }
  }
  @HostListener('window:mouseup', ['$event'])
  mouseUp(event) {
    CardHostDirective.dragging = false;
    CardHostDirective.thisEl.style.position = 'unset'
    CardHostDirective.thisEl.style.left = ''
    CardHostDirective.thisEl.style.height = ''
    CardHostDirective.thisEl.style.width = ''
  }
}
