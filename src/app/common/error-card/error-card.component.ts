import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.scss']
})
export class ErrorCardComponent implements OnInit {

@Input() errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
