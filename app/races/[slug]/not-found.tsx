import PageShell from '@/app/components/PageShell';
import RaceNotFound from '@/app/components/RaceNotFound';
import SiteFooter from '@/app/components/SiteFooter';
import SiteHeader from '@/app/components/SiteHeader';

export default function NotFound() {
  return (
    <PageShell>
      <SiteHeader deadlinesHref="/?distance=any&when=any" />
      <RaceNotFound />
      <SiteFooter />
    </PageShell>
  );
}
