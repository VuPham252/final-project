import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';
import { RoomData } from 'src/app/core/api/room/room-data';
import { Room } from 'src/app/core/model/room';
import { roomType } from 'src/app/core/model/room-type';
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
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  listRoomType: roomType[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private roomData : RoomData,
    private dialog: MatDialog,
    private roomType :RoomTypeData
    ) { }

    get f() { return this.form.controls; }
    ngOnInit(): void {
      // this.id = this.route.snapshot.params['id'];
      // this.isCreateMode = !this.id;
      this.roomType.search().subscribe((x: Array<roomType>) => this.listRoomType = x || []);

      if (this.defaults) {
        this.isCreateMode = false;

      } else {
        this.isCreateMode = true;
        this.defaults = {} as Room;

      }
      this.form = this.fb.group({
        id: this.defaults.id || '',
        name: [this.defaults.name || '', [Validators.required]],
        roomTypeId: [this.defaults.roomTypeId || '', [Validators.required]],
        area: [this.defaults.area || '', [Validators.required]],
        size: [this.defaults.size || '', [Validators.required]],
        description: [this.defaults.description || '', [Validators.required]],
      })

    }


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
            this.dialog.closeAll()
          },
          error: (error) => {
            console.log(error)
            this.alertService.error(this.isCreateMode ? "Create Failed!" : "Update Failed");
          }
        })
      }else{
        room.id =  this.defaults.id;
        this.roomData.update(room.id, room)
        .subscribe({
          next: (response) => {
            this.alertService.success(this.isCreateMode ? "Create Successful!" : "Update Successful");
            this.dialog.closeAll()
          },
          error: (error) => {
            console.log(error)
            this.alertService.error(this.isCreateMode ? "Create Failed!" : "Update Failed");
          }
        })
      }


    }

    onNoClick() {
      this.dialog.closeAll()
    }

    close(answer: string) {
      this.dialog.closeAll();
    }

}
