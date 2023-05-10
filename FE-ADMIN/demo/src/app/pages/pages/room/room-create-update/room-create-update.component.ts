import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  @Input() isView: string;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private roomData : RoomData,
    private dialog: MatDialogRef<RoomCreateUpdateComponent>,
    private roomType :RoomTypeData
    ) { }

    get f() { return this.form.controls; }
    ngOnInit(): void {
      // debugger
      this.form = this.fb.group({
        id: '',
        name: [ '', [Validators.required]],
        roomTypeId: [ '', [Validators.required]],
        area: ['', [Validators.required]],
        size: ['', [Validators.required]],
        description: ['', [Validators.required]],
      })
      // this.route.data.subscribe(e => {
      //   this.isView = e?.isView;
      // })
      // this.id = this.route.snapshot.params['id'];
      // this.isCreateMode = !this.id;
      this.roomType.search().subscribe((x: Array<roomType>) => this.listRoomType = x || []);
      if (this.defaults && this.defaults.isView == 'view'){
        this.isView = this.defaults.isView;
        this.form.setValue ( this.defaults.roomData);
      }
      else if (this.defaults) {
        this.isCreateMode = false;
        this.form.setValue(
          this.defaults
        ) ;
      } else {
        this.isCreateMode = true;
        this.defaults = {} as Room;

      }
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
            this.dialog.close(response)
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
            this.dialog.close(response)
          },
          error: (error) => {
            console.log(error)
            this.alertService.error(this.isCreateMode ? "Create Failed!" : "Update Failed");
          }
        })
      }


    }

    onNoClick() {
      this.dialog.close()
    }

    close(answer: string) {
      this.dialog.close();
    }

}
