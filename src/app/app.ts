import { Component, inject } from '@angular/core';
import { DefaultUrlSerializer, Router } from '@angular/router';

interface ParseResult {
  direct: string;
  router: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly serializer = new DefaultUrlSerializer();

  protected readonly vulnerableUrl = '/?hasOwnProperty=first&later=second';
  protected readonly safeUrl = '/?ordinary=first&later=second';
  protected readonly initialUrl =
    (window as Window & {__angularReproInitialUrl?: string}).__angularReproInitialUrl ??
    window.location.pathname + window.location.search + window.location.hash;
  protected testedUrl = '';
  protected result: ParseResult = {direct: '', router: ''};

  constructor() {
    this.runTest(
      this.initialUrl.includes('hasOwnProperty') ? this.initialUrl : this.vulnerableUrl,
    );
  }

  protected runTest(url: string): void {
    this.testedUrl = url;

    let direct: string;
    try {
      direct = `Returned ${this.serializer.serialize(this.serializer.parse(url))}`;
    } catch (error) {
      direct = `THREW ${error instanceof Error ? `${error.name}: ${error.message}` : String(error)}`;
    }

    const routerTree = this.router.parseUrl(url);
    this.result = {
      direct,
      router: `Returned ${this.router.serializeUrl(routerTree)} (Router catches parser errors and falls back to /)`,
    };
  }
}
