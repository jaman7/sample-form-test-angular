import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { IDictType } from '@app/shared/models/dict-type';
import { Observable, of } from 'rxjs';

interface Item {
  id: number;
  code: string;
  name: string;
  status: string;
  description: string;
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
})
export class TreeViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data;

  @Input() statusDict: IDictType[] = [];

  groupedItems: Observable<{ [key: string]: Item[] }> = of({});

  ngOnInit(): void {
    this.groupItemsByStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;

    this.ifChanged(data, () => {
      this.groupItemsByStatus();
    });
  }

  ngOnDestroy(): void {
    this.groupedItems = of({});
  }

  ifChanged(prop: SimpleChange, callback: (value: any) => void): void {
    if (JSON.stringify(prop?.previousValue) !== JSON.stringify(prop?.currentValue)) {
      callback(true);
    }
  }

  groupItemsByStatus(): any {
    const data: { [key: string]: Item[] } = {};
    const obj: { [key: string]: Item[] } = {};
    this.data?.forEach(item => {
      if (!data[item.status]) {
        data[item.status] = [];
      }
      data[item.status].push(item);
    });
    this.statusDict.forEach(el => {
      const { displayName } = el || {};
      obj[displayName] = data?.[displayName] || [];
    });
    this.groupedItems = of(obj);
  }
}
