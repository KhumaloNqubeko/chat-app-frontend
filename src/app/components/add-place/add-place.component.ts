import { Component, OnInit, Inject, ViewContainerRef, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  onSubmit = new EventEmitter();
  place: string;

  constructor(
    public dialogRef: MatDialogRef<AddPlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
  }

  addPlace() {
    this.onSubmit.next(this.place);
    this.closeDialog();
    this.viewContainerRef.clear();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
