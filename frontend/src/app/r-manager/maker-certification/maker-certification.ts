import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-maker-certification',
  imports: [],
  templateUrl: './maker-certification.html',
  styleUrl: './maker-certification.css',
})
export class MakerCertification {
  svg: Record<string, SafeHtml>;

  constructor(private sanitizer: DomSanitizer) {
    this.svg = {
      arrow: this.sanitize(`<svg>...</svg>`),
      makerActive: this.sanitize(`<svg>...</svg>`),
      checker: this.sanitize(`<svg>...</svg>`),
      docValidation: this.sanitize(`<svg>...</svg>`),
      preCheck: this.sanitize(`<svg>...</svg>`),
      compliance: this.sanitize(`<svg>...</svg>`),
      contextAware: this.sanitize(`<svg>...</svg>`),
    };
  }

  sanitize(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
