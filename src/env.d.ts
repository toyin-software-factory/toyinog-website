/// <reference path="../.astro/types.d.ts" />

type ContactEnv = import('./lib/contact/handler').ContactEnv;
type Runtime = import('@astrojs/cloudflare').Runtime<ContactEnv>;

declare namespace App {
  interface Locals extends Runtime {}
}
