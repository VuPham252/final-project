import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MtxSelectModule } from "@ng-matero/extensions/select";
import { MatDialogModule } from '@angular/material/dialog';
import { BlogCreateUpdateComponent } from './blog-create-update.component';
import { QuillModule } from 'ngx-quill';
import 'quill-mention';
import 'quill-emoji';

@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MtxSelectModule,

    QuillModule.forRoot({
      modules:{
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['code-block'],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            //[{ 'direction': 'rtl' }],                         // text direction

            //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            //[{ 'font': [] }],
            //[{ 'align': [] }],

            ['clean'],                                         // remove formatting button

            ['link'],
            //['link', 'image', 'video']
          ],

        },

        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ["@", "#"],
          source: (searchTerm, renderList, mentionChar) => {
            let values;

            if (mentionChar === "@") {
              values = [
                { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
                { id: 2, value: 'Patrik Sjölin' }
              ];
            } else {
              values =[
                { id: 3, value: 'Fredrik Sundqvist 2' },
                { id: 4, value: 'Patrik Sjölin 2' }
              ]
            }

            if (searchTerm.length === 0) {
              renderList(values, searchTerm);
            } else {
              const matches = [];
              for (var i = 0; i < values.length; i++)
                if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
              renderList(matches, searchTerm);
            }
          },
        },
        "emoji-toolbar": true,
        "emoji-textarea": false,
        "emoji-shortname": true,
        keyboard: {
          bindings: {
            // shiftEnter: {
            //   key: 13,
            //   shiftKey: true,
            //   handler: (range, context) => {
            //     // Handle shift+enter
            //     console.log("shift+enter")
            //   }
            // },
            enter:{
              key:13,
              handler: (range, context)=>{
                console.log("enter");
                return true;
              }
            }
          }
        }
      }
    }),

  ],
  declarations: [BlogCreateUpdateComponent],
  exports: [BlogCreateUpdateComponent]
})
export class BlogCreateUpdateModule {

 }
