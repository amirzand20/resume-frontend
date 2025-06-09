import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Resume {
  id: number;
  title: string;
  status: string;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
  personalInfo: {
    name: string;
    jobTitle: string;
    birthDate: string;
    militaryStatus: string;
    summary: string;
  };
  contact: {
    email: string;
    mobile: string;
    address: string;
  };
  skills: {
    name: string;
    percentage: number;
  }[];
  education: {
    degree: string;
    field: string;
    university: string;
    startYear: string;
    endYear: string;
  }[];
  workExperience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }[];
  languages: {
    name: string;
    reading: number;
    writing: number;
    speaking: number;
    listening: number;
  }[];
  certificates: {
    title: string;
    institute: string;
    date: string;
  }[];
  research: {
    title: string;
    publisher: string;
    date: string;
    link?: string;
  }[];
  projects: {
    title: string;
    client: string;
    date: string;
  }[];
  honors: {
    title: string;
    date: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:3000/resume';

  // Mock data for testing
  private mockResumes: Resume[] = [
    {
      id: 1,
      title: 'رزومه نمونه ۱',
      status: 'completed',
      isComplete: true,
      createdAt: '2024-03-20T10:00:00Z',
      updatedAt: '2024-03-20T10:00:00Z',
      personalInfo: {
        name: 'علی محمدی',
        jobTitle: 'توسعه‌دهنده فرانت‌اند',
        birthDate: '1990-01-01',
        militaryStatus: 'پایان خدمت',
        summary: 'توسعه‌دهنده با ۵ سال تجربه در Angular و React'
      },
      contact: {
        email: 'ali@example.com',
        mobile: '09123456789',
        address: 'تهران، ایران'
      },
      skills: [
        { name: 'Angular', percentage: 90 },
        { name: 'React', percentage: 85 },
        { name: 'TypeScript', percentage: 95 }
      ],
      education: [
        {
          degree: 'کارشناسی',
          field: 'مهندسی نرم‌افزار',
          university: 'دانشگاه تهران',
          startYear: '2010',
          endYear: '2014'
        }
      ],
      workExperience: [
        {
          title: 'توسعه‌دهنده ارشد',
          company: 'شرکت نمونه',
          location: 'تهران',
          startDate: '2020-01-01',
          endDate: '2024-03-20',
          responsibilities: ['توسعه رابط کاربری', 'مدیریت تیم']
        }
      ],
      languages: [
        {
          name: 'انگلیسی',
          reading: 90,
          writing: 85,
          speaking: 80,
          listening: 95
        }
      ],
      certificates: [
        {
          title: 'Angular Advanced',
          institute: 'Udemy',
          date: '2023-01-01'
        }
      ],
      research: [],
      projects: [],
      honors: []
    },
    {
      id: 2,
      title: 'رزومه نمونه ۲',
      status: 'draft',
      isComplete: false,
      createdAt: '2024-03-19T15:30:00Z',
      updatedAt: '2024-03-19T15:30:00Z',
      personalInfo: {
        name: 'رضا احمدی',
        jobTitle: 'توسعه‌دهنده بک‌اند',
        birthDate: '1992-05-15',
        militaryStatus: 'پایان خدمت',
        summary: 'توسعه‌دهنده Node.js با ۳ سال تجربه'
      },
      contact: {
        email: 'reza@example.com',
        mobile: '09123456788',
        address: 'اصفهان، ایران'
      },
      skills: [
        { name: 'Node.js', percentage: 95 },
        { name: 'Express', percentage: 90 },
        { name: 'MongoDB', percentage: 85 }
      ],
      education: [
        {
          degree: 'کارشناسی ارشد',
          field: 'مهندسی کامپیوتر',
          university: 'دانشگاه صنعتی شریف',
          startYear: '2014',
          endYear: '2016'
        }
      ],
      workExperience: [
        {
          title: 'توسعه‌دهنده بک‌اند',
          company: 'شرکت فناوری',
          location: 'اصفهان',
          startDate: '2021-01-01',
          endDate: '2024-03-19',
          responsibilities: ['توسعه API', 'بهینه‌سازی پایگاه داده']
        }
      ],
      languages: [
        {
          name: 'انگلیسی',
          reading: 85,
          writing: 80,
          speaking: 75,
          listening: 90
        }
      ],
      certificates: [],
      research: [],
      projects: [],
      honors: []
    }
  ];

  constructor(private http: HttpClient) {}

  getUserResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.apiUrl}/step1/user-resumes`);
    // return of(this.mockResumes); // Commenting out mock data
  }

  getResumeById(id: number): Observable<Resume> {
    // For testing, return mock data instead of making HTTP request
    const resume = this.mockResumes.find(r => r.id === id);
    if (!resume) {
      return throwError(() => new Error('Resume not found'));
    }
    return of(resume);
    // return this.http.get<Resume>(`${this.apiUrl}/${id}`);
  }

  deleteResume(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/step1/${id}`);
  }

  submitStep1(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/step1`, data);
  }

  createNewResume(): Observable<any> {
    return this.http.post(`${this.apiUrl}/step1/create`, {});
  }
} 