export default function Loading() {
  return (
    <div className="senovio-page-loader" role="status" aria-live="polite" aria-label="Loading page">
      <img src="/senovio-logo.webp" alt="" className="senovio-page-loader__mark" />
      <span className="sr-only">Loading page</span>
    </div>
  );
}
