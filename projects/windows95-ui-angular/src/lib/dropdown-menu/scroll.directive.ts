import { Directive, ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Directive({
	selector: '[scrollDirective]'
})
export class ScrollDirective {

	scrollSubject: Subject<any> = new Subject<any>();

	constructor(private eleRef: ElementRef, private scrollService: ScrollService) {

		const element = this.eleRef.nativeElement;

		element.addEventListener('scroll', () => {
			console.log("hellooooooooooooo");
			
			this.scrollService.scrollSubject.next(null);
		});
	}
}

@Injectable({
	providedIn: 'root'
})
export class ScrollService {
	
	scrollSubject: Subject<any> = new Subject<any>();

	constructor() { }

	scroll() {
		this.scrollSubject.next(null);
	}
}