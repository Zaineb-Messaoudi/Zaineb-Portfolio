function LoadingScreen({ isExiting = false }) {
  return (
    <main className={`app-loading loading-overlay ${isExiting ? "is-exiting" : ""}`} aria-label="Loading Zaineb Messaoudi portfolio" aria-busy="true">
      <img
        className="loading-logo"
        src="/assets/zaineb-horizontal-logo-dark.png"
        alt="Zaineb Messaoudi horizontal logo"
        decoding="async"
      />
    </main>
  );
}

export default LoadingScreen;
