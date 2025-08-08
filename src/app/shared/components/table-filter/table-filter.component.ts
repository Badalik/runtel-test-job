import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatLabel } from '@angular/material/input';
import { debounceTime, map } from 'rxjs';

import { TableColumn } from '@core/models';

@Component({
  selector: 'app-table-filter',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInput,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.scss',
})
export class TableFilterComponent implements OnInit {

  public columns = input.required<TableColumn[]>();

  public valueChanged = output<Partial<{ [p: string]: string | null }>>();

  protected formGroup!: FormGroup<{ [p: string]: FormControl<string | null> }>;

  private readonly _destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    const formGroup: { [key: string]: FormControl } = {};

    for (const column of this.columns()) {
      formGroup[column.name] = new FormControl<string | null>(null);
    }

    this.formGroup = new FormGroup(formGroup);

    this.formGroup.valueChanges
      .pipe(
        debounceTime(300),
        map((formValue) => {
          for (const [key, value] of Object.entries(formValue)) {
            if (value !== null) {
              formValue[key] = typeof value === 'undefined' || value === '' ? null : value.trim().toLowerCase();
            }
          }

          return formValue;
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((value) => {
        this.valueChanged.emit(value);
      });
  }

  protected clearControl(name: string): void {
    this.formGroup.get(name)?.setValue(null);
  }

}
