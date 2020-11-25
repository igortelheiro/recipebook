import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	@Output() renderPage = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
	}

	navClick(pageTitle) {
		this.renderPage.emit(pageTitle.target.text)
	}

}
