import { DialogRef } from '@angular/cdk/dialog';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  workForm = new FormGroup({
    companyName: new FormControl('', [
      Validators.required
    ]),
    companySite: new FormControl,
    additionalText: new FormControl('', [
      Validators.required
    ]),
    imageURL: new FormControl,
    hiddenStatus: new FormControl
  });

  url: any;

  constructor(
    private workServ: WorkService,
    private dRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { };

  ngOnInit(): void {
    this.workForm.patchValue(this.data);
  }

  onSubmit() {

    if (this.workForm.valid) {
      if (this.data) {
        this.workServ.updateWork(this.data.id, this.workForm.value).subscribe({
          next: (val: any) => {
            this.dRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.workServ.addWork(this.workForm.value).subscribe({
          next: (val: any) => {
            this.dRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }

  }

  upload(event: Event) {
    console.log(event);
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);

    var reader = new FileReader();

    reader.onload =this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(file);

    this.workForm.controls['imageURL'].setValue(this.url);
    console.log(this.url)
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.url= 'data:image/png;base64,'+  btoa(binaryString);
           this.workForm.controls['imageURL'].setValue(this.url);
           console.log(btoa(binaryString));
   }


}
