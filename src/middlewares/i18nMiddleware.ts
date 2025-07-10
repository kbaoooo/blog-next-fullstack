import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import CONSTANSTS from "@/utils/constants";

const initIntlMiddleware = createMiddleware({
  locales: [CONSTANSTS.VI, CONSTANSTS.EN],
  defaultLocale: CONSTANSTS.VI,
});

export async function i18nMiddleware(request: NextRequest) {
    const intlResponse = initIntlMiddleware(request);
    if (intlResponse) return intlResponse;
}