import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomData } from 'src/app/core/api/room/room-data';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'vex-room-create-update',
  templateUrl: './room-create-update.component.html',
  styleUrls: ['./room-create-update.component.scss']
})
export class RoomCreateUpdateComponent implements OnInit {
  id!: number;
  form: UntypedFormGroup;
  isCreateMode!: boolean;
  submitted = false;
  constructor(
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private roomData : RoomData
    ) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.isCreateMode = !this.id;

      this.form = this.fb.group({
        id: null,
        name: [null, [Validators.required]],
        roomTypeId: [null, [Validators.required]],
        area: [null, [Validators.required]],
        size: [null, [Validators.required]],
        description: [null, [Validators.required]],
      })

      if (!this.isCreateMode) {
        this.roomData.getById(this.id)
          .subscribe(x => this.form.patchValue(x));
      }
    }

    get f() { return this.form.controls; }

    onSubmit() {
      console.log("submit")
      this.submitted = true;
      if (this.form.invalid)
        return;

      const room = this.form.value;
      if(this.isCreateMode){
        this.roomData.save(room)
        .subscribe({
          next: (response) => {
            this.alertService.success(this.isCreateMode ? "Create Successful!" : "Update Successful");
            this.router.navigate(["pages/room"]);
          },
          error: (error) => {
            console.log(error)
            this.alertService.error(this.isCreateMode ? "Create Failed!" : "Update Failed");
          }
        })
      }else{
        this.roomData.update(this.id, room)
        .subscribe({
          next: (response) => {
            this.alertService.success(this.isCreateMode ? "Create Successful!" : "Update Successful");
            this.router.navigate(["pages/room"]);
          },
          error: (error) => {
            console.log(error)
            this.alertService.error(this.isCreateMode ? "Create Failed!" : "Update Failed");
          }
        })
      }


    }

}
