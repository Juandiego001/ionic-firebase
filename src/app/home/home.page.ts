import { Component, OnInit, ElementRef } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.readStudent()
      .subscribe(data => {
        console.log(data);
        this.students = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()['Name'],
            Age: e.payload.doc.data()['Age'],
            Address: e.payload.doc.data()['Address']
          }
        })
      });
  }

  createRecord(): any {
    let record = {
      'Name': this.studentName,
      'Age': this.studentAge,
      'Address': this.studentAddress
    };

    this.crudService.createStudent(record)
      .then(res => {
        console.log(res);
        this.studentName = '';
        this.studentAge = null;
        this.studentAddress = '';
      })
      .catch(err => {
        alert('There was an error while trying to create the stuent');
        console.log(err);
      })
  }

  removeRecord(id): any {
    this.crudService.deleteStudent(id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        alert('There was an error while trying to delete the stuent');
        console.log(err);
      });
  }

  updateRecord(id): any {
    let childInputName = document.getElementById(`${id}Name`).childNodes[0] as HTMLElement;
    let childInputAge = document.getElementById(`${id}Age`).childNodes[0] as HTMLElement;
    let childInputAddress = document.getElementById(`${id}Address`).childNodes[0] as HTMLElement;

    let newName = childInputName['value'] as string;
    let newAge = childInputAge['value'] as number;
    let newAddress = childInputAddress['value'] as string;

    let record = {
      'Name': newName,
      'Age': newAge,
      'Address': newAddress
    }

    this.crudService.updateStudent(id, record)
      .then(res => {
        alert('The student was update successfully!');
        console.log(res);
      })
      .catch(err => {
        alert('There was an error while trying to update');
        console.log(err);
      });
  }
}
