import { PageEvent } from '@angular/material/paginator';

export abstract class WithPaginator<T> {
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [1, 3, 5, 10];

  firstInResponse: T;
  lastInResponse: T;

  constructor() {}

  paginate(e: PageEvent): void {
    this.pageIndex = e.pageIndex;

    if (this.pageSize !== e.pageSize) {
      this.pageIndex = 0;
      this.pageSize = e.pageSize;
    }

    if (e.pageIndex > e.previousPageIndex) {
      this.fetchData(this.lastInResponse);
    } else if (e.pageIndex < e.previousPageIndex) {
      this.fetchData(null, this.firstInResponse);
    } else {
      this.fetchData();
    }
  }

  abstract fetchData(start?: T, end?: T): void;
}
