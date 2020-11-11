import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ExportComponent } from './export/export.component';
import { LyricComponent } from './lyric/lyric.component';
import { PreviewComponent } from './preview/preview.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'lyric', component: LyricComponent },
  { path: 'edit', component: EditComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'export', component: ExportComponent },
  { path: '**', component: UploadComponent, redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
