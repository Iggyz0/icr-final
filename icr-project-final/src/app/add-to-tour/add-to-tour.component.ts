import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowPieceModel } from '../models/ShowpieceModel';

@Component({
  selector: 'app-add-to-tour',
  templateUrl: './add-to-tour.component.html',
  styleUrls: ['./add-to-tour.component.css']
})
export class AddToTourComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ShowPieceModel) { }

  ngOnInit(): void {
    
  }

}
