import { UntypedFormControl } from '@angular/forms';

export interface ITrucks {
  id?: number;
  code?: string;
  name?: string;
  status?: string;
  statusId?: number;
  description?: string;
}

export interface ITrucksForm {
  id: UntypedFormControl;
  code: UntypedFormControl;
  name: UntypedFormControl;
  statusId: UntypedFormControl;
  description: UntypedFormControl;
}
