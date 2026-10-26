import Hero from '@/app/components/Hero';
import HeroSearch from '@/app/components/HeroSearch';
import PageShell from '@/app/components/PageShell';
import ResultsSection from '@/app/components/ResultsSection';
import SiteFooter from '@/app/components/SiteFooter';
import SiteHeader from '@/app/components/SiteHeader';
import { filterHref, parseFilters, type SearchParams } from '@/app/lib/filters';
import { findRaces } from '@/app/lib/races';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filters = parseFilters(await searchParams);
  const now = new Date();
  const races = await findRaces(filters, now);

  return (
    <PageShell>
      <SiteHeader deadlinesHref={filterHref(filters, { sort: 'deadline', when: 'any', distance: 'any' })} />
      <Hero>
        <HeroSearch filters={filters} count={races.length} />
      </Hero>
      <ResultsSection races={races} filters={filters} now={now} />
      <SiteFooter />
    </PageShell>
  );
}
