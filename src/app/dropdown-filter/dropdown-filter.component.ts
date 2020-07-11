import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {IFloatingFilter, IFloatingFilterParams, NumberFilter, TextFilter} from "ag-grid-community";
import {AgFrameworkComponent} from "ag-grid-angular";
import {Filter} from "ag-grid-community/dist/lib/interfaces/iFilter";

export interface DropdownFilterParams extends IFloatingFilterParams{
  optionMap: Map<string,string>;
}

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.css']
})
export class DropdownFilterComponent implements IFloatingFilter, AgFrameworkComponent<DropdownFilterParams> {
  private params : DropdownFilterParams;
  private optionMap:Map<string, string>;
  selectedValue: string;

  constructor(private _elementRef: ElementRef,  private renderer: Renderer2) {
    this.renderer.setStyle(this._elementRef.nativeElement, 'width', '100%');
    // this.renderer.setStyle(this._elementRef.nativeElement, 'height', '100%');
    this.renderer.setStyle(this._elementRef.nativeElement, 'margin', '2px 5px 2px 2px');
    this.renderer.setStyle(this._elementRef.nativeElement, 'height', '30px');
  }

  agInit(params: DropdownFilterParams) {
    this.params=params;
    this.optionMap=params.optionMap;
  }

  onParentModelChanged(parentModel: any): void {
    if(!parentModel)
      this.selectedValue = '';
    else
      this.selectedValue=parentModel.filter;
  }

  onSelectionChange(event: Event) {
    console.log(event);
    // let value = event.target.value;
    let value=this.selectedValue;
    // this.params.onFloatingFilterChanged('equals', value);
    this.params.parentFilterInstance(function (instance) {
      (<TextFilter>instance).onFloatingFilterChanged('equals', value);
    });
  }
}
