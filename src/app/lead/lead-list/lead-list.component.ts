import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { LeadService } from '../lead.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
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

  pageSizeOptions = [2, 5, 10];
  pageLength;
  pageSize = 10;
  pageNumber = 0;

  allLeadsCount;

  unSortedData;

  constructor(
    private leadService: LeadService
  ) { }

  ngOnInit(): void {
    this.getLeads();
    this.allLeads.paginator = this.tablePaginator;
    this.getLeadsCount();
  }

  ngAfterViewInit() {
    this.allLeads.sort = this.sortingTable;
  }

  getLeads() {
    this.leadService.fetchAllUserLeads(this.pageNumber, this.pageSize);
    this.allLeads.data = this.leadService.getAllUserLeads();
    this.leadSubs = this.leadService.getUpdatedUserLeadsListener()
      .subscribe((leads) => {
        this.allLeads.data = [...leads];
        this.unSortedData = [...leads];
      });
  }

  getLeadsCount() {
    this.leadService.fetchLeadsCount()
      .subscribe((response) => {
        this.allLeadsCount = response.data;
        this.pageLength = this.allLeadsCount;
        console.log(this.pageLength);
      }, (error) => {
        console.log(error.error);
      });
  }


  pageEvent(event) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.getLeads();
  }

  sortData(sort: Sort) {
    const data = this.allLeads.data;
    if (sort.direction === '' || !sort.active) {
      this.allLeads.data = this.unSortedData;
      return;
    }

    this.allLeads.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.leadId, b.leadId, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        case 'policy type': return this.compare(a.policyTypeId.name, b.policyTypeId.name, isAsc);
        case 'complaint type': return this.compare(a.complaintTypeId.name, b.complaintTypeId.name, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  ngOnDestroy() {
    this.leadSubs.unsubscribe();
  }

}
