export interface BlogPost {
  id: number;
  title: string;
  body: string;
  // imageUrl: string;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
}
