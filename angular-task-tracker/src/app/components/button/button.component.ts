import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//ncjamieson.com/understanding-subjects/

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text!: string;
  @Input() color!: string;

  constructor() { }

  ngOnInit(): void {
  }

  

}
