import {DecimalPipe} from '@angular/common';
import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {Country} from '../country';
import {CountryService} from '../country.service';
import {SortableDirective, SortEvent} from '../sortable.directive';
import * as Highcharts from 'highcharts';
import {DropdownFilterComponent} from "../dropdown-filter/dropdown-filter.component";
import {Module, TextFilter} from "ag-grid-community";
import {IFilterComp} from "ag-grid-community/dist/lib/interfaces/iFilter";

// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
    selector: 'app-mobile',
    templateUrl: './mobile.component.html',
    styleUrls: ['./mobile.component.css'],
    providers: [CountryService, DecimalPipe]
})
export class MobileComponent implements OnInit {

    total$: Observable<number>;

    @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
    private people: any[] = [];

    // public modules: Module[] = AllCommunityModules;
    constructor(public service: CountryService) {
        // this.countries$ = service.countries$;
        this.total$ = service.total$;
    }

    ngOnInit() {
        this.people = this.getMockPeople()

    }

    // public modules: Module[] = [ClientSideRowModelModule];

    onSort({column, direction}: SortEvent) {
        // resetting other headers
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }


    countries = ["Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands",
        "Colombia",
        "Comoros",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote d\'Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "East Timor",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Faeroe Islands",
        "Falkland Islands",
        "Fiji",
        "Finland",
        "Former Yugoslav Republic of Macedonia",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories",
        "Gabon",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "North Korea",
        "Northern Marianas",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn Islands",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Sqo Tome and Principe",
        "Saint Helena",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "The Bahamas",
        "The Gambia",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "Virgin Islands",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "United States Minor Outlying Islands",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Yugoslavia",
        "Zambia",
        "Zimbabwe",];
    placeholder: any = "select countries";
    selectedCountries: string[] = [];

    show() {
        console.log(this.selectedCountries);
    }

    coutriesList = [
        {name: 'Afghanistan', code: 'AF'},
        {name: 'Åland Islands', code: 'AX'},
        {name: 'Albania', code: 'AL'},
        {name: 'Algeria', code: 'DZ'},
        {name: 'American Samoa', code: 'AS'},
        {name: 'AndorrA', code: 'AD'},
        {name: 'Angola', code: 'AO'},
        {name: 'Anguilla', code: 'AI'},
        {name: 'Antarctica', code: 'AQ'},
        {name: 'Antigua and Barbuda', code: 'AG'},
        {name: 'Argentina', code: 'AR'},
        {name: 'Armenia', code: 'AM'},
        {name: 'Aruba', code: 'AW'},
        {name: 'Australia', code: 'AU'},
        {name: 'Austria', code: 'AT'},
        {name: 'Azerbaijan', code: 'AZ'},
        {name: 'Bahamas', code: 'BS'},
        {name: 'Bahrain', code: 'BH'},
        {name: 'Bangladesh', code: 'BD'},
        {name: 'Barbados', code: 'BB'},
        {name: 'Belarus', code: 'BY'},
        {name: 'Belgium', code: 'BE'},
        {name: 'Belize', code: 'BZ'},
        {name: 'Benin', code: 'BJ'},
        {name: 'Bermuda', code: 'BM'},
        {name: 'Bhutan', code: 'BT'},
        {name: 'Bolivia', code: 'BO'},
        {name: 'Bosnia and Herzegovina', code: 'BA'},
        {name: 'Botswana', code: 'BW'},
        {name: 'Bouvet Island', code: 'BV'},
        {name: 'Brazil', code: 'BR'},
        {name: 'British Indian Ocean Territory', code: 'IO'},
        {name: 'Brunei Darussalam', code: 'BN'},
        {name: 'Bulgaria', code: 'BG'},
        {name: 'Burkina Faso', code: 'BF'},
        {name: 'Burundi', code: 'BI'},
        {name: 'Cambodia', code: 'KH'},
        {name: 'Cameroon', code: 'CM'},
        {name: 'Canada', code: 'CA'},
        {name: 'Cape Verde', code: 'CV'},
        {name: 'Cayman Islands', code: 'KY'},
        {name: 'Central African Republic', code: 'CF'},
        {name: 'Chad', code: 'TD'},
        {name: 'Chile', code: 'CL'},
        {name: 'China', code: 'CN'},
        {name: 'Christmas Island', code: 'CX'},
        {name: 'Cocos (Keeling) Islands', code: 'CC'},
        {name: 'Colombia', code: 'CO'},
        {name: 'Comoros', code: 'KM'},
        {name: 'Congo', code: 'CG'},
        {name: 'Congo, The Democratic Republic of the', code: 'CD'},
        {name: 'Cook Islands', code: 'CK'},
        {name: 'Costa Rica', code: 'CR'},
        {name: 'Cote D\'Ivoire', code: 'CI'},
        {name: 'Croatia', code: 'HR'},
        {name: 'Cuba', code: 'CU'},
        {name: 'Cyprus', code: 'CY'},
        {name: 'Czech Republic', code: 'CZ'},
        {name: 'Denmark', code: 'DK'},
        {name: 'Djibouti', code: 'DJ'},
        {name: 'Dominica', code: 'DM'},
        {name: 'Dominican Republic', code: 'DO'},
        {name: 'Ecuador', code: 'EC'},
        {name: 'Egypt', code: 'EG'},
        {name: 'El Salvador', code: 'SV'},
        {name: 'Equatorial Guinea', code: 'GQ'},
        {name: 'Eritrea', code: 'ER'},
        {name: 'Estonia', code: 'EE'},
        {name: 'Ethiopia', code: 'ET'},
        {name: 'Falkland Islands (Malvinas)', code: 'FK'},
        {name: 'Faroe Islands', code: 'FO'},
        {name: 'Fiji', code: 'FJ'},
        {name: 'Finland', code: 'FI'},
        {name: 'France', code: 'FR'},
        {name: 'French Guiana', code: 'GF'},
        {name: 'French Polynesia', code: 'PF'},
        {name: 'French Southern Territories', code: 'TF'},
        {name: 'Gabon', code: 'GA'},
        {name: 'Gambia', code: 'GM'},
        {name: 'Georgia', code: 'GE'},
        {name: 'Germany', code: 'DE'},
        {name: 'Ghana', code: 'GH'},
        {name: 'Gibraltar', code: 'GI'},
        {name: 'Greece', code: 'GR'},
        {name: 'Greenland', code: 'GL'},
        {name: 'Grenada', code: 'GD'},
        {name: 'Guadeloupe', code: 'GP'},
        {name: 'Guam', code: 'GU'},
        {name: 'Guatemala', code: 'GT'},
        {name: 'Guernsey', code: 'GG'},
        {name: 'Guinea', code: 'GN'},
        {name: 'Guinea-Bissau', code: 'GW'},
        {name: 'Guyana', code: 'GY'},
        {name: 'Haiti', code: 'HT'},
        {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
        {name: 'Holy See (Vatican City State)', code: 'VA'},
        {name: 'Honduras', code: 'HN'},
        {name: 'Hong Kong', code: 'HK'},
        {name: 'Hungary', code: 'HU'},
        {name: 'Iceland', code: 'IS'},
        {name: 'India', code: 'IN'},
        {name: 'Indonesia', code: 'ID'},
        {name: 'Iran, Islamic Republic Of', code: 'IR'},
        {name: 'Iraq', code: 'IQ'},
        {name: 'Ireland', code: 'IE'},
        {name: 'Isle of Man', code: 'IM'},
        {name: 'Israel', code: 'IL'},
        {name: 'Italy', code: 'IT'},
        {name: 'Jamaica', code: 'JM'},
        {name: 'Japan', code: 'JP'},
        {name: 'Jersey', code: 'JE'},
        {name: 'Jordan', code: 'JO'},
        {name: 'Kazakhstan', code: 'KZ'},
        {name: 'Kenya', code: 'KE'},
        {name: 'Kiribati', code: 'KI'},
        {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
        {name: 'Korea, Republic of', code: 'KR'},
        {name: 'Kuwait', code: 'KW'},
        {name: 'Kyrgyzstan', code: 'KG'},
        {name: 'Lao People\'S Democratic Republic', code: 'LA'},
        {name: 'Latvia', code: 'LV'},
        {name: 'Lebanon', code: 'LB'},
        {name: 'Lesotho', code: 'LS'},
        {name: 'Liberia', code: 'LR'},
        {name: 'Libyan Arab Jamahiriya', code: 'LY'},
        {name: 'Liechtenstein', code: 'LI'},
        {name: 'Lithuania', code: 'LT'},
        {name: 'Luxembourg', code: 'LU'},
        {name: 'Macao', code: 'MO'},
        {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
        {name: 'Madagascar', code: 'MG'},
        {name: 'Malawi', code: 'MW'},
        {name: 'Malaysia', code: 'MY'},
        {name: 'Maldives', code: 'MV'},
        {name: 'Mali', code: 'ML'},
        {name: 'Malta', code: 'MT'},
        {name: 'Marshall Islands', code: 'MH'},
        {name: 'Martinique', code: 'MQ'},
        {name: 'Mauritania', code: 'MR'},
        {name: 'Mauritius', code: 'MU'},
        {name: 'Mayotte', code: 'YT'},
        {name: 'Mexico', code: 'MX'},
        {name: 'Micronesia, Federated States of', code: 'FM'},
        {name: 'Moldova, Republic of', code: 'MD'},
        {name: 'Monaco', code: 'MC'},
        {name: 'Mongolia', code: 'MN'},
        {name: 'Montserrat', code: 'MS'},
        {name: 'Morocco', code: 'MA'},
        {name: 'Mozambique', code: 'MZ'},
        {name: 'Myanmar', code: 'MM'},
        {name: 'Namibia', code: 'NA'},
        {name: 'Nauru', code: 'NR'},
        {name: 'Nepal', code: 'NP'},
        {name: 'Netherlands', code: 'NL'},
        {name: 'Netherlands Antilles', code: 'AN'},
        {name: 'New Caledonia', code: 'NC'},
        {name: 'New Zealand', code: 'NZ'},
        {name: 'Nicaragua', code: 'NI'},
        {name: 'Niger', code: 'NE'},
        {name: 'Nigeria', code: 'NG'},
        {name: 'Niue', code: 'NU'},
        {name: 'Norfolk Island', code: 'NF'},
        {name: 'Northern Mariana Islands', code: 'MP'},
        {name: 'Norway', code: 'NO'},
        {name: 'Oman', code: 'OM'},
        {name: 'Pakistan', code: 'PK'},
        {name: 'Palau', code: 'PW'},
        {name: 'Palestinian Territory, Occupied', code: 'PS'},
        {name: 'Panama', code: 'PA'},
        {name: 'Papua New Guinea', code: 'PG'},
        {name: 'Paraguay', code: 'PY'},
        {name: 'Peru', code: 'PE'},
        {name: 'Philippines', code: 'PH'},
        {name: 'Pitcairn', code: 'PN'},
        {name: 'Poland', code: 'PL'},
        {name: 'Portugal', code: 'PT'},
        {name: 'Puerto Rico', code: 'PR'},
        {name: 'Qatar', code: 'QA'},
        {name: 'Reunion', code: 'RE'},
        {name: 'Romania', code: 'RO'},
        {name: 'Russian Federation', code: 'RU'},
        {name: 'RWANDA', code: 'RW'},
        {name: 'Saint Helena', code: 'SH'},
        {name: 'Saint Kitts and Nevis', code: 'KN'},
        {name: 'Saint Lucia', code: 'LC'},
        {name: 'Saint Pierre and Miquelon', code: 'PM'},
        {name: 'Saint Vincent and the Grenadines', code: 'VC'},
        {name: 'Samoa', code: 'WS'},
        {name: 'San Marino', code: 'SM'},
        {name: 'Sao Tome and Principe', code: 'ST'},
        {name: 'Saudi Arabia', code: 'SA'},
        {name: 'Senegal', code: 'SN'},
        {name: 'Serbia and Montenegro', code: 'CS'},
        {name: 'Seychelles', code: 'SC'},
        {name: 'Sierra Leone', code: 'SL'},
        {name: 'Singapore', code: 'SG'},
        {name: 'Slovakia', code: 'SK'},
        {name: 'Slovenia', code: 'SI'},
        {name: 'Solomon Islands', code: 'SB'},
        {name: 'Somalia', code: 'SO'},
        {name: 'South Africa', code: 'ZA'},
        {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
        {name: 'Spain', code: 'ES'},
        {name: 'Sri Lanka', code: 'LK'},
        {name: 'Sudan', code: 'SD'},
        {name: 'Suriname', code: 'SR'},
        {name: 'Svalbard and Jan Mayen', code: 'SJ'},
        {name: 'Swaziland', code: 'SZ'},
        {name: 'Sweden', code: 'SE'},
        {name: 'Switzerland', code: 'CH'},
        {name: 'Syrian Arab Republic', code: 'SY'},
        {name: 'Taiwan, Province of China', code: 'TW'},
        {name: 'Tajikistan', code: 'TJ'},
        {name: 'Tanzania, United Republic of', code: 'TZ'},
        {name: 'Thailand', code: 'TH'},
        {name: 'Timor-Leste', code: 'TL'},
        {name: 'Togo', code: 'TG'},
        {name: 'Tokelau', code: 'TK'},
        {name: 'Tonga', code: 'TO'},
        {name: 'Trinidad and Tobago', code: 'TT'},
        {name: 'Tunisia', code: 'TN'},
        {name: 'Turkey', code: 'TR'},
        {name: 'Turkmenistan', code: 'TM'},
        {name: 'Turks and Caicos Islands', code: 'TC'},
        {name: 'Tuvalu', code: 'TV'},
        {name: 'Uganda', code: 'UG'},
        {name: 'Ukraine', code: 'UA'},
        {name: 'United Arab Emirates', code: 'AE'},
        {name: 'United Kingdom', code: 'GB'},
        {name: 'United States', code: 'US'},
        {name: 'United States Minor Outlying Islands', code: 'UM'},
        {name: 'Uruguay', code: 'UY'},
        {name: 'Uzbekistan', code: 'UZ'},
        {name: 'Vanuatu', code: 'VU'},
        {name: 'Venezuela', code: 'VE'},
        {name: 'Viet Nam', code: 'VN'},
        {name: 'Virgin Islands, British', code: 'VG'},
        {name: 'Virgin Islands, U.S.', code: 'VI'},
        {name: 'Wallis and Futuna', code: 'WF'},
        {name: 'Western Sahara', code: 'EH'},
        {name: 'Yemen', code: 'YE'},
        {name: 'Zambia', code: 'ZM'},
        {name: 'Zimbabwe', code: 'ZW'}
    ];


    selectedPersonId: any;


    gridOptions = {
        defaultColDef: {
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            floatingFilter: true,
            resizable: true,
        },
        components: {
            selectFloatingFilter: getSelectFilterComponent(),
        }

    };
    frameworkComponent= {

        dropdownFilterComponent:DropdownFilterComponent
    }

    columnDefs = [
        {
            field: "id",
            valueFormatter: bracketsFormatter,
        },
        {
            field: "isActive",
            valueFormatter: activeFormatter,

            //option 1 using javascript
            // suppressMenu: true,
            // suppressFilterButton: true,
            // filter: 'agTextColumnFilter',
            // floatingFilterComponent: 'selectFloatingFilter',
            // floatingFilterComponentParams: {
            //     suppressFilterButton: true,
            //     color: 'darkblue',
            //     valueMap: new Map([['', ''], ["Active", 'true'], ['InActive', 'false']])
            // }

            //option 2 using angular component
            floatingFilterComponent: 'dropdownFilterComponent',
            floatingFilterComponentParams: {
                suppressFilterButton: true,
                optionMap: new Map([['', ''], ["Active", 'true'], ['InActive', 'false']])
            },
            filter: 'agTextColumnFilter',
            suppressMenu: false,

            //other filters
            // filterParams: {
            //   suppressAndOrCondition:true,
            //   filterOptions: [
            //     {
            //       displayKey: 'Active',
            //       displayName: 'Active',
            //       test: function(filterValue, cellValue) {
            //         return cellValue != null && cellValue == 'true';
            //       },
            //       hideFilterInput: true,
            //     },
            //     {
            //       displayKey: 'InActive',
            //       displayName: 'InActive',
            //       test: function(filterValue, cellValue) {
            //         return cellValue != null && cellValue == 'false';
            //       },
            //       hideFilterInput: true,
            //     },
            //   ],
            // },
        },
        {
            field: 'name',
            filter: 'agTextColumnFilter',
            filterParams: {
                filterOptions: ['contains', 'notContains'],
                textFormatter: function (r) {
                    if (r == null) return null;
                    return r
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .replace(/[àáâãäå]/g, 'a')
                        .replace(/æ/g, 'ae')
                        .replace(/ç/g, 'c')
                        .replace(/[èéêë]/g, 'e')
                        .replace(/[ìíîï]/g, 'i')
                        .replace(/ñ/g, 'n')
                        .replace(/[òóôõö]/g, 'o')
                        .replace(/œ/g, 'oe')
                        .replace(/[ùúûü]/g, 'u')
                        .replace(/[ýÿ]/g, 'y')
                        .replace(/\W/g, '');
                },
                debounceMs: 0,
                suppressAndOrCondition: true,
            },
        },
        {
            field: 'name',
            filterParams: {
                filterOptions: ['contains'],
                textCustomComparator: function (_, value, filterText) {
                    var filterTextLowerCase = filterText.toLowerCase();
                    var valueLowerCase = value.toString().toLowerCase();
                    var aliases = {
                        usa: 'united states',
                        holland: 'netherlands',
                        vodka: 'russia',
                        niall: 'ireland',
                        sean: 'south africa',
                        alberto: 'mexico',
                        john: 'australia',
                        xi: 'china',
                    };

                    function contains(target, lookingFor) {
                        return target && target.indexOf(lookingFor) >= 0;
                    }

                    var literalMatch = contains(valueLowerCase, filterTextLowerCase);
                    return (
                        literalMatch ||
                        contains(valueLowerCase, aliases[filterTextLowerCase])
                    );
                },
                debounceMs: 2000,
            },
        },
        {
            field: 'age',
            floatingFilterComponent: 'sliderFloatingFilter',
            floatingFilterComponentParams: {
                maxValue: 100,
                suppressFilterButton: true,
            },
            filter: 'agNumberColumnFilter',
            suppressMenu: false,
        }
    ];

    defaultColDef = {
        editable:true,
        sortable: true,
        flex: 1,
        filter: true,
        floatingFilter: true,
    };

    getMockPeople() {
        return [
            {
                'id': '5a15b13c36e7a7f00cf0d7cb',
                'index': 2,
                'isActive': true,
                'picture': 'http://placehold.it/32x32',
                'age': 23,
                'name': 'Karyn Wright',
                'gender': 'female',
                'company': 'ZOLAR',
                'email': 'karynwright@zolar.com',
                'phone': '+1 (851) 583-2547'
            },
            {
                'id': '5a15b13c2340978ec3d2c0ea',
                'index': 3,
                'isActive': false,
                'picture': 'http://placehold.it/32x32',
                'age': 35,
                'name': 'Rochelle Estes',
                'disabled': true,
                'gender': 'female',
                'company': 'EXTRAWEAR',
                'email': 'rochelleestes@extrawear.com',
                'phone': '+1 (849) 408-2029'
            },
            {
                'id': '5a15b13c663ea0af9ad0dae8',
                'index': 4,
                'isActive': false,
                'picture': 'http://placehold.it/32x32',
                'age': 25,
                'name': 'Mendoza Ruiz',
                'gender': 'male',
                'company': 'ZYTRAX',
                'email': 'mendozaruiz@zytrax.com',
                'phone': '+1 (904) 536-2020'
            },
            {
                'id': '5a15b13cc9eeb36511d65acf',
                'index': 5,
                'isActive': false,
                'picture': 'http://placehold.it/32x32',
                'age': 39,
                'name': 'Rosales Russell',
                'gender': 'male',
                'company': 'ELEMANTRA',
                'email': 'rosalesrussell@elemantra.com',
                'phone': '+1 (868) 473-3073'
            },
            {
                'id': '5a15b13c728cd3f43cc0fe8a',
                'index': 6,
                'isActive': true,
                'picture': 'http://placehold.it/32x32',
                'age': 32,
                'name': 'Marquez Nolan',
                'gender': 'male',
                'company': 'MIRACLIS',
                'disabled': true,
                'email': 'marqueznolan@miraclis.com',
                'phone': '+1 (853) 571-3921'
            },
            {
                'id': '5a15b13ca51b0aaf8a99c05a',
                'index': 7,
                'isActive': false,
                'picture': 'http://placehold.it/32x32',
                'age': 28,
                'name': 'Franklin James',
                'gender': 'male',
                'company': 'CAXT',
                'email': 'franklinjames@caxt.com',
                'phone': '+1 (868) 539-2984'
            },
            {
                'id': '5a15b13cc3b9381ffcb1d6f7',
                'index': 8,
                'isActive': false,
                'picture': 'http://placehold.it/32x32',
                'age': 24,
                'name': 'Elsa Bradley',
                'gender': 'female',
                'company': 'MATRIXITY',
                'email': 'elsabradley@matrixity.com',
                'phone': '+1 (994) 583-3850'
            },
            {
                'id': '5a15b13ce58cb6ff62c65164',
                'index': 9,
                'isActive': true,
                'picture': 'http://placehold.it/32x32',
                'age': 40,
                'name': 'Pearson Thompson',
                'gender': 'male',
                'company': 'EZENT',
                'email': 'pearsonthompson@ezent.com',
                'phone': '+1 (917) 537-2178'
            },
            {
                'id': '5a15b13c90b95eb68010c86e',
                'index': 10,
                'isActive': true,
                'picture': 'http://placehold.it/32x32',
                'age': 32,
                'name': 'Ina Pugh',
                'gender': 'female',
                'company': 'MANTRIX',
                'email': 'inapugh@mantrix.com',
                'phone': '+1 (917) 450-2372'
            },
            {
                'id': '5a15b13c2b1746e12788711f',
                'index': 11,
                'isActive': true,
                'picture': 'http://placehold.it/32x32',
                'age': 25,
                'name': 'Nguyen Elliott',
                'gender': 'male',
                'company': 'PORTALINE',
                'email': 'nguyenelliott@portaline.com',
                'phone': '+1 (905) 491-3377'
            },
            {
                'id': '5a15b13c605403381eec5019',
                'index': 12,
                'isActive': true,
                'picture': 'http://placehold.it/32x32',
                'age': 31,
                'name': 'Mills Barnett',
                'gender': 'male',
                'company': 'FARMEX',
                'email': 'millsbarnett@farmex.com',
                'phone': '+1 (882) 462-3986'
            },
            {
                'id': '5a15b13c67e2e6d1a3cd6ca5',
                'index': 13,
                'isActive': true,
                'picture': 'http://placehold.it/32x32',
                'age': 36,
                'name': 'Margaret Reynolds',
                'gender': 'female',
                'company': 'ROOFORIA',
                'email': 'margaretreynolds@rooforia.com',
                'phone': '+1 (935) 435-2345'
            },
            {
                'id': '5a15b13c947c836d177aa85c',
                'index': 14,
                'isActive': false,
                'picture': 'http://placehold.it/32x32',
                'age': 29,
                'name': 'Yvette Navarro',
                'gender': 'female',
                'company': 'KINETICA',
                'email': 'yvettenavarro@kinetica.com',
                'phone': '+1 (807) 485-3824'
            },
            {
                'id': '5a15b13c5dbbe61245c1fb73',
                'index': 15,
                'isActive': false,
                'picture': 'http://placehold.it/32x32',
                'age': 20,
                'name': 'Elisa Guzman',
                'gender': 'female',
                'company': 'KAGE',
                'email': 'elisaguzman@kage.com',
                'phone': '+1 (868) 594-2919'
            },
            {
                'id': '5a15b13c38fd49fefea8db80',
                'index': 16,
                'isActive': false,
                'picture': 'http://placehold.it/32x32',
                'age': 33,
                'name': 'Jodie Bowman',
                'gender': 'female',
                'company': 'EMTRAC',
                'email': 'jodiebowman@emtrac.com',
                'phone': '+1 (891) 565-2560'
            },
            {
                'id': '5a15b13c9680913c470eb8fd',
                'index': 17,
                'isActive': false,
                'picture': 'http://placehold.it/32x32',
                'age': 24,
                'name': 'Diann Booker',
                'gender': 'female',
                'company': 'LYRIA',
                'email': 'diannbooker@lyria.com',
                'phone': '+1 (830) 555-3209'
            }
        ];
    }

    public chartOptions: any = {
        chart: {
            type: 'column',
            height: 700
        },
        title: {
            text: 'Sample Scatter Plot'
        },
        credits: {
            enabled: false
        },
        // tooltip: {
        //   formatter: function() {
        //     return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) +
        //         'y: ' + this.y.toFixed(2);
        //   }
        // },
        tooltip: {
            valueSuffix: " °C"
        },
        xAxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        yAxis: {
            title: {
                text: "Temperature °C"
            }
        },
        series: [
            {
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            },
            {
                name: 'New York',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            },

        ]
    }


    highcharts = Highcharts;


    addData() {
        let data = this.chartOptions.series
        let berlin = {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        };
        let london = {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        };
        this.chartOptions.series.push(berlin);
    }
}

function bracketsFormatter(params) {
    return '(' + params.value + ')';
}

function activeFormatter(params) {
    return params.value ? 'Active' : 'InActive';
}


function getSelectFilterComponent() {
    function SelectFilter() {
    }

    SelectFilter.prototype.init = function (params) {
        this.eGui = document.createElement('div');
        var htmlTemplate = '<select name="options" id="options" style="width:100%; padding: 2px 5px;height: 25px;"> ';
        var mapSelect = params.valueMap;
        mapSelect.forEach((value, key) => {
            htmlTemplate = htmlTemplate.concat('<option value="').concat(value).concat('">').concat(key).concat('</option>');
        })
        htmlTemplate = htmlTemplate.concat('</select>/>');
        this.eGui.innerHTML = htmlTemplate;
        this.currentValue = null;
        this.eFilterSelect = this.eGui.querySelector('select');
        this.eFilterSelect.style.color = params.color;

        function onInputBoxChanged(event) {
            var value = event.target.value;
            params.parentFilterInstance(function (instance:IFilterComp) {
                (<TextFilter>instance).onFloatingFilterChanged('equals', value);
            });
        }

        this.eFilterSelect.addEventListener('change', onInputBoxChanged);
    };

    SelectFilter.prototype.onParentModelChanged = function (parentModel) {
        // When the filter is empty we will receive a null message her
        if (!parentModel) {
            this.eFilterSelect.value = '';
            this.currentValue = null;
        } else {
            this.eFilterSelect.value = parentModel.filter + '';
            this.currentValue = parentModel.filter;
        }
    };

    SelectFilter.prototype.getGui = function () {
        return this.eGui;
    };

    return SelectFilter;
}
