import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'backupAnalyzer';

  nodeItems: FileSystemNode[] = [{ children: [] } as FileSystemNode];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('assets/size-filename.log', { responseType: 'text' })
      .subscribe((data: any) => {
        for (const line of data.split(/[\r\n]+/)) {
          if (line.length > 1) {
            const entry = line.split(' ');
            const path = entry[1];
            const size: number = +entry[0];

            if (path) {
              this.addToModel(path, size);
            } else {
              console.error('No path in ', { line });
            }
          }
        }
      });
  }

  private addToModel(path: string, size: number): void {
    let n: FileSystemNode = this.nodeItems[0];
    for (const element of path.split('/')) {
      n = this.addItem(n, element, size);
      n.children.sort((a: FileSystemNode, b: FileSystemNode) => {
        return b.size - a.size;
      });
    }
    this.nodeItems[0].children.sort((a: FileSystemNode, b: FileSystemNode) => {
      return b.size - a.size;
    });
  }

  private addItem(node: FileSystemNode, elmName: string, fileSize: number): FileSystemNode {
    if (node.children.some((e) => e.name === elmName)) {
      const el = node.children.filter((e) => e.name === elmName)[0];
      el.size = el.size + fileSize;
      return el;
    } else {
      const el = { name: elmName, size: fileSize, children: [] } as FileSystemNode;
      node.children.push(el);
      return el;
    }
  }
}
