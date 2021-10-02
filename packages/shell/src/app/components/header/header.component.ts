import {Component, Input, OnInit} from '@angular/core';

export interface NavItem {
  name: string;
  href: string;
}

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() routes: NavItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
