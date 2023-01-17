import { Post } from '../../posts.model';

export const postStub = (): Partial<Post> => {
  return {
    id: 1,
    title: 'title1',
    content: 'string1',
    image: 'image1',
    userId: 1,
  };
};
