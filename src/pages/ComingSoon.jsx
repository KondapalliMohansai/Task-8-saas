import PageHeader from '../components/common/PageHeader';

// Notification and Settings are in the navigation but have no screen in the Figma file
export default function ComingSoon({ title }) {
  return (
    <>
      <PageHeader title={title} />
      <div className="rounded-2xl bg-white p-10 text-center text-body shadow-card">
        <p className="text-lg font-semibold text-ink">{title} is not designed yet</p>
        <p className="mt-2 text-sm">There is no Figma screen for this page, so it is left empty for now.</p>
      </div>
    </>
  );
}
