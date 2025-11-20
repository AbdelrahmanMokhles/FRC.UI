import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenceService } from '../../../Services/Dashboard/Licenses/licence-service';
import { LicenceDetails } from '../../../Models/PBXDevice/PBXDevice.models';

@Component({
  selector: 'app-licence-info-component',
  imports: [CommonModule],
  templateUrl: './licence-info-component.html',
  styleUrl: './licence-info-component.scss'
})
export class LicenceInfoComponent {

  licenceId?: number;
  licenceDetails?: LicenceDetails;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _licenceService: LicenceService

  ) {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.licenceId = +params['id'];
        console.log("Idddddd : ", this.licenceId);
        this.loadLicenceDetails(this.licenceId);
      }
    });
  }

  loadLicenceDetails(id: number) {
    this._licenceService.getLicenceById(id).subscribe({
      next: (res) => {
        const dto = res.data;
        console.log("data", res.data);

        const licence: LicenceDetails = {
          id: dto.id,
          model: dto.model,
          mac: dto.mac,
          plan: dto.plan,
          concurrentCalls: dto.concurrentCalls,
          expireDate: dto.expireDate,
          userEmail: dto.userEmail
        };

        this.licenceDetails = licence;
        console.log("Mapped Licence:", licence);

      },
      error: err => alert(err.message)
    });
  }
}
