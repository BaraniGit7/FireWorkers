import { HARDCODED_PRODUCTS, DemoProduct } from "../data/index.js";

export type { DemoProduct };

export const INITIAL_PRODUCTS: DemoProduct[] = HARDCODED_PRODUCTS;

export async function fetchHealth() {
  return {
    success: true,
    data: {
      status: "ONLINE",
      version: "1.0.0",
      environment: "standalone-frontend",
      liveCheckoutEnabled: true,
      regulatoryFramework: {
        act: "Explosives Act 1884 / Explosives Rules 2008",
        licensing: "PESO LE-1/LE-3/LE-5 compliant click-and-collect",
        certification: "CSIR-NEERI Green Crackers only"
      }
    }
  };
}
