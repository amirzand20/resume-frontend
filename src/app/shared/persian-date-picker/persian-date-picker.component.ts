import { Component, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import dayjs from 'dayjs';
import moment from "jalali-moment";
import jalaliday from 'jalaliday';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';

const jalaliConverter = dayjs.extend(jalaliday) as any

@Component({
  selector: 'aja-persian-date-picker',
  templateUrl: './persian-date-picker.component.html',
  styleUrls: ['./persian-date-picker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgPersianDatepickerModule,
    ToastModule,
    InputMaskModule
  ],
  providers: [
    MessageService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersianDatePickerComponent),
      multi: true,
    },
  ]
})
export class PersianDatePickerComponent implements ControlValueAccessor, OnInit {
  form: FormGroup
  @ViewChild('inputRef') inputRef: any
  @ViewChild('datepickerRef') datepickerRef: any
  @Input() disabled: boolean = false
  @Input() dataFormatmask: string = "9999/99"
  @Input() showDatepicker: boolean = true
  @Input() justMonth: boolean = false
  @Input() todayDate: boolean = false
  @Input() label: string = ""
  @Output() onDateSelect = new EventEmitter();
  @Input() readonly: boolean = false;


  constructor(private fb: FormBuilder,
    private messageService: MessageService) {
    this.form = this.fb.group({
      control: [''],
      dateString: [''],
    })
  }

  ngOnInit(): void {
  }

  get formControl() {
    return this.form.controls
  }

  onChange: any = () => { };
  onTouch: any = () => { };

  set value(val: any) {
    this.onChange();
    this.onTouch();
  }

  writeValue(data: string): void {
    if (data) {
      setTimeout(() => {
        this.form.patchValue({
          control: moment(data).format('jYYYY-jMM-jDD'),
          dateString: moment(data).format('YYYY-MM-DD')
        });
        this.form.updateValueAndValidity()
      }, 0)
    } else {
      this.form.patchValue({
        control: '',
        dateString: ''
      });
    }
  }
  registerOnChange(fn: any): void {
    this.form.valueChanges
      .pipe(map((dd) => {
        const result = this.processStringToDate(this.form.getRawValue().control)
        if (!result) return null
        return (!this.form.invalid ? this.processStringToDate(this.form.getRawValue().control).dateString : null)
      }))
      .subscribe(fn);
  }

  processStringToDate = (value: string): any => {
    if (!value) return null
    const dateFormattedValue = value.replaceAll('_', '').split('/')
    const [year, month, day] = dateFormattedValue
    // const dateOfString = jalaliConverter(`${+year > 1300 ? year : '1300'}/${month ?? '1'}/${day ?? ''}`)
    // const gregoryOfDate = jalaliConverter(dateOfString.format('YYYY/MM/DD'), { jalali: true }).calendar("gregory")

    if (day?.length == 2)
      this.datepickerRef?.onOutsideClick()
    return {
      control: value,
      dateString: moment(value, 'jYYYY-jMM-jDD').format('YYYY-MM-DD')
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable()
    // this.form.disable()    
    this.disabled = isDisabled;
  }

  onDateChange(data: any) {
    this.onDateSelect.emit({
      ...data,
      isoStringDate: dayjs(data.gregorian).add(4, 'hour').add(30, 'minute').toISOString()
    })
  }

  onClick(event: any) {
    const calendarInput = event.target as HTMLInputElement
    setTimeout(() => {
      calendarInput.setSelectionRange(0, 0)
      calendarInput.focus()
    }, 100);
  }
  resetDate() {
    this.onDateSelect.emit('')
    this.form.setValue({
      control: '',
      dateString: ''
    })
    this.form.updateValueAndValidity()

  }
  onValChange(event: any) {
    const val = event.target.value
    if (val === '____/__/__') return this.resetDate()
    if (val) {
      const dirtyValue = val
      const dateFormattedValue = val.replaceAll('_', '').split('/')
      const onlyCharacters = val.replaceAll('_', '').replaceAll('/', '')
      const arrayOfChars = [...dirtyValue.replaceAll('/', '')]
      const calendarInput = this.inputRef.inputViewChild.nativeElement as HTMLInputElement
      calendarInput.focus()
      if (arrayOfChars.findIndex(v => v !== '_') > 0) {
        this.messageService.add({
          key: 'datepicker-toast',
          severity: 'error',
          summary: 'خطا!',
          detail: 'تاریخ وارد شده صحیح نمی باشد'
        });
        return this.resetDate()
      }
      else if (arrayOfChars.indexOf('_') !== -1 && arrayOfChars.map(v => v !== '_').lastIndexOf(true) > arrayOfChars.indexOf('_')) {
        this.messageService.add({
          key: 'datepicker-toast',
          severity: 'error',
          summary: 'خطا!',
          detail: 'تاریخ وارد شده صحیح نمی باشد'
        });
        return this.resetDate()
      }
      else if (onlyCharacters.length > 6)
        calendarInput.setSelectionRange(onlyCharacters.length + 2, onlyCharacters.length + 2)
      else if (onlyCharacters.length > 3)
        calendarInput.setSelectionRange(onlyCharacters.length + 1, onlyCharacters.length + 1)
      else if (onlyCharacters.length < 4)
        calendarInput.setSelectionRange(onlyCharacters.length, onlyCharacters.length)

      const [year, month, day] = dateFormattedValue

      if (year.length == 4) {
        if (+year < 1300 || +year > 1500) {
          this.messageService.add({
            key: 'datepicker-toast',
            severity: 'error',
            summary: 'خطا!',
            detail: 'تاریخ وارد شده صحیح نمی باشد'
          });
          return this.resetDate()
        }
        if (month.length == 2) {
          if (+month == 0 || +month > 12) {
            this.messageService.add({
              key: 'datepicker-toast',
              severity: 'error',
              summary: 'خطا!',
              detail: 'تاریخ وارد شده صحیح نمی باشد'
            });
            return this.resetDate()
          }
          if (!this.justMonth) {

            if (day?.length == 2) {
              if (+day == 0 || +day > 31 || +day > 30 && +month > 6) {
                this.messageService.add({
                  key: 'datepicker-toast',
                  severity: 'error',
                  summary: 'خطا!',
                  detail: 'تاریخ وارد شده صحیح نمی باشد'
                });
                return this.resetDate()
              }
              if ((this.justMonth || +day > 29) && +month === 12 && !LeapYears.includes(jalaliConverter(dirtyValue).format('YYYY/MM/DD'))) {
                // if (+day > 29 && +month === 12 && !this.IsKabisehYear(jalaliConverter(dirtyValue).year())) {
                this.messageService.add({
                  key: 'datepicker-toast',
                  severity: 'error',
                  summary: 'خطا!',
                  detail: 'تاریخ وارد شده صحیح نمی باشد'
                });
                return this.resetDate()
              }
            }
          }
        }
      }
    }
  }

  IsKabisehYear(year: number) {
    const LeapYearsMod: number[] = [1, 5, 9, 13, 17, 22, 26, 30]
    let inputYear = year
    if (!year) return false
    if (typeof year === 'string')
      inputYear = +year
    return LeapYearsMod.includes(inputYear % 33)
  }

}

const LeapYears = ['1300/12/30', '1304/12/30', '1309/12/30', '1313/12/30', '1317/12/30', '1321/12/30', '1325/12/30',
  '1329/12/30', '1333/12/30', '1337/12/30', '1342/12/30', '1346/12/30', '1350/12/30', '1354/12/30', '1358/12/30',
  '1362/12/30', '1366/12/30', '1370/12/30', '1375/12/30', '1379/12/30', '1383/12/30', '1387/12/30', '1391/12/30',
  '1395/12/30', '1399/12/30', '1403/12/30', '1408/12/30', '1412/12/30', '1416/12/30', '1420/12/30', '1424/12/30',
  '1428/12/30', '1432/12/30', '1436/12/30', '1441/12/30', '1445/12/30', '1449/12/30', '1453/12/30', '1457/12/30',
  '1461/12/30', '1465/12/30', '1469/12/30', '1474/12/30', '1478/12/30', '1482/12/30', '1486/12/30', '1490/12/30',
  '1494/12/30', '1498/12/30', '1503/12/30', '1507/12/30', '1511/12/30', '1515/12/30', '1519/12/30', '1523/12/30',
  '1527/12/30', '1531/12/30', '1536/12/30', '1540/12/30', '1544/12/30', '1548/12/30', '1552/12/30', '1556/12/30',
  '1560/12/30', '1564/12/30', '1568/12/30', '1573/12/30', '1577/12/30', '1581/12/30', '1585/12/30', '1589/12/30',
  '1593/12/30', '1597/12/30', '1602/12/30', '1606/12/30', '1610/12/30', '1614/12/30', '1618/12/30', '1622/12/30',
  '1626/12/30', '1630/12/30', '1635/12/30', '1639/12/30', '1643/12/30', '1647/12/30', '1651/12/30', '1655/12/30',
  '1659/12/30', '1663/12/30', '1668/12/30', '1672/12/30', '1676/12/30', '1680/12/30', '1684/12/30', '1688/12/30',
  '1692/12/30', '1696/12/30',
]