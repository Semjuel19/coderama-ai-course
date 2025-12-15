import { LocationIcon, TwitterIcon, LinkIcon, CompanyIcon } from '@/assets/icons';

interface UserLinksProps {
  location: string | null;
  twitter: string | null;
  blog: string;
  company: string | null;
}

export function UserLinks({ location, twitter, blog, company }: UserLinksProps) {
  const linkClass = (available: boolean) =>
    `flex items-center gap-200 font-mono text-preset-6 ${
      available
        ? 'text-neutral-500 dark:text-white'
        : 'text-neutral-500 dark:text-white opacity-50'
    }`;

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-200">
      <div className={linkClass(!!location)}>
        <LocationIcon className="w-5 h-5 shrink-0" />
        <span>{location || 'Not Available'}</span>
      </div>
      <div className={linkClass(!!twitter)}>
        <TwitterIcon className="w-5 h-5 shrink-0" />
        {twitter ? (
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            @{twitter}
          </a>
        ) : (
          <span>Not Available</span>
        )}
      </div>
      <div className={linkClass(!!blog)}>
        <LinkIcon className="w-5 h-5 shrink-0" />
        {blog ? (
          <a
            href={blog.startsWith('http') ? blog : `https://${blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline truncate"
          >
            {blog}
          </a>
        ) : (
          <span>Not Available</span>
        )}
      </div>
      <div className={linkClass(!!company)}>
        <CompanyIcon className="w-5 h-5 shrink-0" />
        <span>{company || 'Not Available'}</span>
      </div>
    </div>
  );
}
