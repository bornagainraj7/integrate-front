import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-doc-modal',
  templateUrl: './doc-modal.component.html',
  styleUrls: ['./doc-modal.component.css']
})
export class DocModalComponent implements OnInit {

  some;
  fileName;
  fileNameInput;
  nameOfFile;
  file;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string }, public dailogRef: MatDialogRef<DocModalComponent>) { }

  ngOnInit(): void {

  }

  onFileSelect(event) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
    this.nameOfFile = this.fileNameInput.split(' ').join('');
    console.log(this.nameOfFile.trim());
    // console.log(this.file);
  }

  submitDocs(form: NgForm) {
    const formData = new FormData();
    formData.append(this.fileNameInput, this.file, this.nameOfFile);
    // console.log(formData);
    this.dailogRef.close(formData);
  }

  onClose() {
    this.dailogRef.close('close');
  }
}
