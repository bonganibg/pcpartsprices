import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection-loader',
  template: `
    <div [ngStyle]="getStyle()" class="skelt-load loader"></div>
  `,
  styleUrls: ['./selection-loader.component.css']
})
export class SelectionLoaderComponent implements OnInit {


  @Input() cWidth: any;
  @Input() cHeight: any;
  constructor() { }

  ngOnInit(): void {
  }

  getStyle()
  {
    const myStyle = {
      'width.%': this.cWidth ? this.cWidth : '',
      'height.px': this.cHeight ? this.cHeight : '',
    }
    return myStyle;
  }

}
