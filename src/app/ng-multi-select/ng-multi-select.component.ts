import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ng-multi-select',
  templateUrl: './ng-multi-select.component.html',
  styleUrls: ['./ng-multi-select.component.css']
})
export class NgMultiSelectComponent implements OnInit {
  labels: any = {selectAll: 'Select All', unselectAll: 'UnselectAll'};

  @Input()
  set dataList(value: string[]) {
    Object.assign(this._dataList, value);
    Object.assign(this.unselectedOptions, this._dataList);
    Object.assign(this.filteredOptions, this._dataList);
  }

  @Input("showTooltip")
  showTooltip: boolean = false;
  @Input("showSelectAll")
  showSelectAll: boolean = true;
  @Input("showUnselectAll")
  showUnselectAll: boolean = true;
  @Input("selectionLimit")
  selectionLimit: number ;
  @Input("showSearch")
  showSearch: boolean = true;
  @Input("placeholder")
  placeholder: string ;
  private _dataList: string[] = [];
  unselectedOptions: string[] = [];
  filteredOptions: string[] = [];
  @Input()
  selectedItems: string[] = [];
  @Output()
  selectedItemsChange = new EventEmitter<string[]>();
  searchFilter: string;
  @Input('disabled')
  disabled: boolean = false;
  classesBtn: string[];
  collapse: boolean = false;

  constructor() {
  }

  ngOnInit() {

    if (!this.classesBtn)
      this.classesBtn = ['btn-block', 'btn-default'];
  }

  toggleDropdown() {
    this.collapse = !this.collapse;

  }

  getButtonText() {
    if(!this.selectedItems || this.selectedItems.length==0)
      return this.placeholder;
    else if(this.selectedItems.length==1)
      return this.selectedItems[0];
    else
      return this.selectedItems[0] + ' ..(' + this.selectedItems.length+')';

  }

  selectAll() {
    this.selectedItems = this._dataList.slice();
    this.selectedItemsChange.emit(this.selectedItems);
    this.unselectedOptions = []
    Object.assign(this.filteredOptions, this.unselectedOptions);
  }

  unselectAll() {
    this.selectedItems = [];
    this.selectedItemsChange.emit(this.selectedItems);
    this.unselectedOptions = this._dataList.slice();
    Object.assign(this.filteredOptions, this.unselectedOptions);
  }

  getDisplay(option: string) {
    return option;
  }

  toggleItem(item: string) {
    if (!this.selectedItems){
      this.selectedItems = [];
    }
    let selectedIndex = this.selectedItems.indexOf(item);
    if (selectedIndex >= 0) {
      this.unselectedOptions.push(item);
      Object.assign(this.filteredOptions, this.unselectedOptions);
      this.selectedItems.splice(selectedIndex, 1);
    } else if (!this.selectionLimit ||  this.selectedItems.length < this.selectionLimit) {
      let unselectedIndex = this.unselectedOptions.indexOf(item);
      this.unselectedOptions.splice(unselectedIndex, 1);
      Object.assign(this.filteredOptions, this.unselectedOptions);
      this.selectedItems.push(item);
    }
    this.selectedItemsChange.emit(this.selectedItems);

  }

  isSelected(option: any) {
    return false;
  }

  onSearchChange(txtFilter) {
    if(txtFilter){
      txtFilter=txtFilter.toLowerCase();
      this.filteredOptions=this.unselectedOptions.filter(item => item.toLowerCase().indexOf(txtFilter)>=0)
    }else
      Object.assign(this.filteredOptions, this.unselectedOptions);

  }
}
