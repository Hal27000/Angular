import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  title='Your Task has been saved'
  confirmButton=''
  backButton=''



  constructor(public dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: {cancelText: string,
    confirmText: string,
    message: string,
    title: string},
    private mdDialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  openDialog(titleData:string) {
    this.dialog.open(ConfirmDialogComponent, {data:{title: titleData}});
  }




  ngOnInit(): void {
  }

  public cancel() {
    this.close(false);
  }
  
  public close(value:any) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc") 
  public onEsc() {
    this.close(false);
  }

  

}
