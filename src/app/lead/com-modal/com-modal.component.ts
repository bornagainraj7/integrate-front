import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LeadService } from '../lead.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-com-modal',
  templateUrl: './com-modal.component.html',
  styleUrls: ['./com-modal.component.css']
})
export class ComModalComponent implements OnInit {

  leadId;
  comsArray = [];
  leadData;

  constructor(
    public dialogRef: MatDialogRef<ComModalComponent>,
    private leadService: LeadService,
  ) { }

  ngOnInit(): void {
    this.getLead();
  }

  getLead() {
    this.leadService.fetchSingleLead(this.leadId)
      .subscribe((response) => {
        if (!response.error) {
          this.leadData = response.data;
          this.comsArray = this.leadData.communication;
        }
      }, (error) => {
        console.log(error.error);
      });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.leadService.addComment(this.leadId, form.value);
    this.getLead();
  }

  onClose() {
    this.dialogRef.close();
  }

}
