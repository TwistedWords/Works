import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { WorkService } from './services/work.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  displayedWorks: MyObjLayout[] = [];
  hiddensts =  false;
  
  constructor(private _dialog: MatDialog, private _workServ: WorkService) { }

  ngOnInit(): void {
    this.getWorks();
  }

  

  openAdd() {
    const diagRef = this._dialog.open(AddEditComponent);
    diagRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getWorks();
        }
      }
    })
  }

  getWorks() {
    this._workServ.getWork().subscribe({
      next: (res) => {
        this.displayedWorks = res
        console.log(this.displayedWorks)
      },
      error: console.log
    })
  }

  deleteWork(id: number) {
    this._workServ.deleteWork(id).subscribe({
      next: (res) => {
          this.getWorks();
      },
      error: console.log
    })
  }

  openEdit(data: any) {
    const diagRef = this._dialog.open(AddEditComponent, {data: data});

    diagRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getWorks();
        }
      },
    });
  }

  showHidden() {
    this.hiddensts = !this.hiddensts;
    this._workServ.getWork().subscribe({
      next: (res) => {
        this.displayedWorks = res
        console.log(this.displayedWorks)
      },
      error: console.log
    })
  }




}

interface MyObjLayout {
  companyName: string;
  companySite: string;
  additionalText: string;
  imageURL: string;
  hiddenStatus: boolean;
  id: number;
}
