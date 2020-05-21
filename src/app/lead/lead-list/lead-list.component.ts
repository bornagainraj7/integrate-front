import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { LeadService } from '../lead.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css']
})
export class LeadListComponent implements OnInit, AfterViewInit, OnDestroy {

  public allLeads = new MatTableDataSource<any>();
  public leadSubs: Subscription;

  @ViewChild(MatSort) sortingTable: MatSort;

  @ViewChild(MatPaginator) tablePaginator: MatPaginator;

  columnsToDisplay = ['id', 'name', 'mobile', 'status', 'policy type', 'complaint type'];

  constructor(
    private leadService: LeadService
  ) { }

  ngOnInit(): void {
    this.leadService.fetchAllUserLeads();
    this.allLeads.data = this.leadService.getAllUserLeads();
    this.leadSubs = this.leadService.getUpdatedUserLeadsListener()
      .subscribe((leads) => {
        this.allLeads.data = leads;
      });

    this.allLeads.paginator = this.tablePaginator;
  }

  ngAfterViewInit() {
    this.allLeads.sort = this.sortingTable;
  }


  ngOnDestroy() {
    this.leadSubs.unsubscribe();
  }

}
