import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { YekanBakhBase64 } from '../../assets/fonts/YekanBakh-Regular.base64';

// Register YekanBakh font in pdfMake's vfs
function registerYekanBakhFont() {
  if (!pdfMake.vfs) {
    pdfMake.vfs = {};
  }
  if (!pdfMake.vfs['YekanBakh-Regular.ttf']) {
    pdfMake.vfs['YekanBakh-Regular.ttf'] = YekanBakhBase64;
  }
}

@Injectable({ providedIn: 'root' })
export class PdfService {
  generateResumePdf(resumeData: any) {
    registerYekanBakhFont();
    const step1 = resumeData.step1 || {};
    const step2 = resumeData.step2 || {};
    const docDefinition = {
      content: [
        { text: 'رزومه', style: 'header', alignment: 'center' },
        { text: 'اطلاعات شخصی', style: 'subheader', margin: [0, 20, 0, 8] },
        {
          table: {
            widths: ['*', '*'],
            body: [
              ['نام', step1.firstName],
              ['نام خانوادگی', step1.lastName],
              ['کد ملی', step1.nationalNo],
              ['تاریخ تولد', step1.birthDate],
              ['درباره من', step1.aboutMe],
              ['ایمیل', step1.emailAddress],
              ['شماره موبایل', step1.mobileNumber],
              ['آدرس', step1.address],
            ]
          }
        },
        { text: 'اطلاعات تماس', style: 'subheader', margin: [0, 20, 0, 8] },
        {
          table: {
            widths: ['*', '*'],
            body: [
              ['آدرس محل سکونت', step2.locationAddress],
              ['شماره موبایل', step2.mobileNumber],
              ['شماره تلفن', step2.telephoneNumber],
              ['کد پستی', step2.postCode],
              ['ایمیل', step2.emailAddress],
              ['شماره موبایل پدر', step2.fatherMobileNumber],
              ['شماره موبایل مادر', step2.motherMobileNumber],
              ['شماره موبایل آشنا', step2.familiarMobileNumber],
            ]
          }
        }
      ],
      defaultStyle: {
        font: 'YekanBakh'
      },
      fonts: {
        YekanBakh: {
          normal: 'YekanBakh-Regular.ttf',
          bold: 'YekanBakh-Regular.ttf',
          italics: 'YekanBakh-Regular.ttf',
          bolditalics: 'YekanBakh-Regular.ttf'
        }
      }
    };
    pdfMake.createPdf(docDefinition).download('resume.pdf');
  }
} 