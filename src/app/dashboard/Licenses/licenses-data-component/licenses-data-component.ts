import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { LicenceService } from '../../../Services/Dashboard/Licenses/licence-service';
import { LicenceDataTable } from '../../../Models/PBXDevice/PBXDevice.models';

@Component({
  selector: 'app-licenses-data-component',
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './licenses-data-component.html',
  styleUrl: './licenses-data-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LicensesDataComponent {
  constructor(private _licenceService: LicenceService, private _router: Router) {
    this.loadLicences();
  }
  licences = signal<LicenceDataTable[]>([]);
  searchTerm = signal('');
  pageSize = 10;
  page = 1;
  total = this.licences.length;

  filteredLicences = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.licences();
    }
    return this.licences().filter(
      (licence) =>
        licence.model?.toLowerCase().includes(term) ||
        licence.mac?.toString().includes(term) ||
        licence?.userEmail?.toString().includes(term)
    );
  });

  loadLicences() {
    this._licenceService.getLicenses().subscribe({
      next: (res) => {
        const items = (res.data.items ?? res.data ?? []).map(
          (p: any) => ({ ...p, })
        );
        this.licences.set(items);
      },
      error: (err) => {
        console.log(err);
        alert('❌ Failed to load licences:');
      },
    });
  }

  licenceInfo(planId: number) {
    this._router.navigate(['/dashboard/licences/licence-info'], {
      queryParams: { id: planId },
    });
  }
  upgradeLicence(planId: number) {
    this._router.navigate(['/dashboard/licences/subscripe-licence'], {
      queryParams: { id: planId },
    });
  }


  ChangePage(event: any) {
    this.page = event;
  }

  // onSearch(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   this.searchTerm.set(input.value);
  // }
}

//#endregion
