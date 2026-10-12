//import { HeartIcon } from '@heroicons/react/24/solid';
import { siteConfig } from '../lib/site';

export default function Footer({ explorer, contract }: { explorer?: string; contract?: string }) {
  return (
    <footer className="bd-t bg-paper-2">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p>
          Built by <a className="link" href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">{siteConfig.authorName}</a>
          </p>
          <a className="mt-3 inline-flex items-center gap-2 font-bold" href={siteConfig.botChainUrl} target="_blank" rel="noopener noreferrer" aria-label="BOT Chain website">
            <span className="logo-mark" aria-hidden="true" />
            <span>Built on BOT Chain</span>
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          <a className="link" href={siteConfig.botChainUrl} target="_blank" rel="noopener noreferrer">BOT Chain</a>
          <a className="link" href={siteConfig.botScanUrl} target="_blank" rel="noopener noreferrer">BOTScan</a>
          {explorer && contract && (
            <a className="link" href={`${explorer}/address/${contract}`} target="_blank" rel="noopener noreferrer">Contract</a>
          )}
          <a className="link" href={siteConfig.projectRepo} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
