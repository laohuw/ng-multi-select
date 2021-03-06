import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {fromEvent, merge, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-ng-multi-select',
  templateUrl: './ng-multi-select.component.html',
  styleUrls: ['./ng-multi-select.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgMultiSelectComponent implements OnInit, OnDestroy, AfterContentInit {

  labels: any = {selectAll: 'Select All', unselectAll: 'UnselectAll'};

  @Input()
  set dataList(value: string[]) {
    this._dataList=Array.from(value);
    this.unselectedOptions=Array.from(this._dataList);
    this.filteredOptions=Array.from(this._dataList);
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
  private readonly _destroy$ = new Subject<void>();
  private _ng_select: HTMLElement;

  constructor(
      private _elementRef: ElementRef,
      private _zone:NgZone,
      @Optional() @Inject(DOCUMENT) private _document: any) {
    this._ng_select=_elementRef.nativeElement;
  }

  ngOnInit() {
    if (!this.classesBtn)
      this.classesBtn = ['btn-block', 'btn-default'];
    this._handleOutsideClick();
  }

  private _handleOutsideClick() {
    if (!this._document) {
      return;
    }

    this._zone.runOutsideAngular(() => {
      merge(
          fromEvent(this._document, 'touchstart', { capture: true }),
          fromEvent(this._document, 'mousedown', { capture: true })
      ).pipe(takeUntil(this._destroy$))
          .subscribe($event => this._checkToClose($event));
    });
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
    this.filteredOptions=Array.from( this.unselectedOptions);
  }

  unselectAll() {
    this.selectedItems = [];
    this.selectedItemsChange.emit(this.selectedItems);
    this.unselectedOptions = this._dataList.slice();
    this.filteredOptions=Array.from( this.unselectedOptions);
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
      this.filteredOptions=Array.from( this.unselectedOptions);
      this.selectedItems.splice(selectedIndex, 1);
    } else if (!this.selectionLimit ||  this.selectedItems.length < this.selectionLimit) {
      let unselectedIndex = this.unselectedOptions.indexOf(item);
      this.unselectedOptions.splice(unselectedIndex, 1);
      this.filteredOptions=Array.from( this.unselectedOptions);
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
      this.filteredOptions=Array.from( this.unselectedOptions);

    this.selectedItems.sort((a:String, b:string)=>{return a.localeCompare(b)});
    this.filteredOptions.sort((a:String, b:string)=>{return a.localeCompare(b)});
  }

  ngAfterContentInit(): void {
    if(this.selectedItems.length>0)
      this.selectedItems.forEach(item =>{
        let index=this.unselectedOptions.indexOf(item);
        this.unselectedOptions.splice(index, 1);
      });
    this.onSearchChange(this.searchFilter);
  }

  private _checkToClose($event: any) {
    if (this._ng_select.contains($event.target) ) {
      return;
    }

    const path = $event.path || ($event.composedPath && $event.composedPath());
    if ($event.target && $event.target.shadowRoot && path && path[0] && this._ng_select.contains(path[0])) {
      return;
    }

    this._zone.run(() => this.close());
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
    // if (this.appendTo) {
    //   this._renderer.removeChild(this._dropdown.parentNode, this._dropdown);
    // }
  }

  private close() {
    this.collapse =false;
  }

}

