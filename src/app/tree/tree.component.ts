import { Component, Input, OnInit } from '@angular/core';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faFolderMinus } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FileSystemNode } from '../app.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() data: FileSystemNode[] = [];

  faFile = faFile;
  faFolderPlus = faFolderPlus;
  faFolderMinus = faFolderMinus;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDisplayChildren(element: FileSystemNode): void{
    element.showChildren = element.showChildren ? false : true;
  }
}
