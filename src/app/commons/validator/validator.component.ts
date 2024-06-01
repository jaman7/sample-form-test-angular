import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, ValidationErrors } from '@angular/forms';
import { ValidationEnum } from '@app/shared/enums/validation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
})
export class ValidatorComponent implements OnInit {
  @Input() control: UntypedFormControl;

  @Input() header: string = '';

  @Input() customName: string = '';

  @Input() customMessage: string = '';

  value: number | string | any = '';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    if (this.header) {
      this.translateService.get(this.header).subscribe(translatedHeader => {
        this.header = translatedHeader;
      });
    }
  }

  message(errors: ValidationErrors | null): string {
    if (!errors) {
      return '';
    }

    const errorKey = Object.keys(errors)?.[0] ?? null;
    if (!errorKey) {
      return '';
    }

    const error = errors[errorKey];
    this.value = this.getErrorValue(errorKey, error);

    return ValidationEnum[errorKey.toUpperCase()] ?? '';
  }

  private getErrorValue(errorKey: string, error: any): any {
    switch (errorKey) {
      case 'minlength':
      case 'maxlength':
        return error.requiredLength;
      case 'min':
        return error.min;
      case 'max':
        return error.max;
      default:
        return '';
    }
  }
}
