import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "w-paginator",
	templateUrl: "./paginator.component.html",
})
export class PaginatorComponent implements OnInit, OnChanges {

	@Input() numberOfDocuments: number = 0;
	@Input() documentsPerPage: number = 10;

	pages: number[] = [];
	@Input() currentPage: number = 0;
	@Output() currentPageChange = new EventEmitter<number>();

	constructor(
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.calculatePages();

		this.route.queryParams.subscribe(params => {
			this.currentPage = params["page"] ? parseInt(params["page"]) : 0;
			this.currentPageChange.emit(this.currentPage);
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes["numberOfDocuments"]) {
			this.calculatePages();
		}
	}

	calculatePages() {
		this.pages = [];
		for (let i = 0; i < this.numberOfDocuments / this.documentsPerPage; i++) {
			this.pages.push(i);
		}
	}

	changePage(delta: number) {
		this.currentPage += delta;
		if(this.currentPage === -1) {
			this.currentPage = 0;
		}
		if(this.currentPage > this.pages.length-1) {
			this.currentPage = this.pages.length-1;
		}

		// Appends the page number to the URL using router
		this.router.navigate([], {
			queryParams: {
				page: this.currentPage
			},
			queryParamsHandling: "merge"
		});
	}

	goToPage(page: number) {
		this.currentPage = page;
		this.router.navigate([], {
			queryParams: {
				page: this.currentPage
			}
		});
	}
}
