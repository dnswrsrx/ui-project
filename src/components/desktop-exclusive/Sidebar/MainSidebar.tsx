import UserIcon from '@components/common/UserIcon';
import classNames from 'classnames';
import Image from 'next/image';
import MarkdownIt from 'markdown-it';

import { apiClient } from '@app/apiClient';
import { compactNumberFormatter } from '@utils/compactNumberFormatter';

type Props = {
  className?: string;
};

const md = new MarkdownIt();

const Sidebar = async ({ className }: Props) => {
  const { site_view: siteView, admins } = await apiClient.getSite();

  const sidebarHtml = md.render(siteView.site.sidebar ?? '');
  return (
    <aside
      id='sidebar'
      className={classNames(
        className,
        'w-0',
        'absolute',
        'top-0',
        'right-0',
        'overflow-x-hidden',
        'duration-150',
        'ease-in-out',
        'lg:block',
        'lg:static',
      )}
    >
      <article className='bg-zinc-900 rounded-lg p-4 mb-4 w-full'>
        <header className='flex flex-col items-center mb-6'>
          {siteView.site.banner && (
            <section className='relative w-[230px] h-[90px]'>
              <Image
                className='mt-4'
                src={siteView.site.banner}
                width={230}
                height={90}
                alt={`${siteView.site.name} banner`}
              />
            </section>
          )}
          <h1 className='text-48 flex items-center gap-8 mb-2'>
            {siteView.site.name}
          </h1>
          <ul className='flex gap-6 text-24'>
            <li className='flex flex-col items-center'>
              <p>{compactNumberFormatter.format(siteView.counts.users)}</p>
              <p className='text-sm'>members</p>
            </li>
            <li className='flex flex-col items-center'>
              <p>{compactNumberFormatter.format(siteView.counts.posts)}</p>
              <p className='text-sm'>posts</p>
            </li>
            <li className='flex flex-col items-center'>
              <p>{compactNumberFormatter.format(siteView.counts.comments)}</p>
              <p className='text-sm'>comments</p>
            </li>
          </ul>
        </header>

        <article className='prose-sm dark:prose-invert prose-zinc hover:prose-a:text-blue-400 prose-a:text-blue-500 prose-hr:border-zinc-500 prose-ul:list-disc'>
          <div dangerouslySetInnerHTML={{ __html: sidebarHtml }} />
        </article>
      </article>

      <article className='bg-zinc-900 rounded-lg p-4 w-full'>
        <h1 className='text-32 mb-4'>Admins</h1>
        <ul className='flex flex-col gap-2'>
          {admins.map((admin) => (
            <li key={admin.person.id}>
              <UserIcon layout={'min'} person={admin.person} />
            </li>
          ))}
        </ul>
      </article>
    </aside>
  );
};

export default Sidebar;
