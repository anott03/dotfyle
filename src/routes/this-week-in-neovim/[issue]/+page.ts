import { trpc } from '$lib/trpc/client';
import { error } from '@sveltejs/kit';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async function load(event: PageLoadEvent) {
	const issueStr = event.params.issue;
  if (isNaN(Number(issueStr))) {
    throw error(404)
  }
  const issue = parseInt(issueStr, 10)
	const post = await trpc(event).getTwinByIssue.query({ issue }).catch(() => {
    throw error(404)
  })
	return { 
    post,
    seo: {
      title: `This Week in Neovim ${post.title}`
    }
  };
};
