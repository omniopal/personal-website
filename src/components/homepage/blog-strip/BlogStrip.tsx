import './BlogStrip.css';

type BlogPost = {
    slug: string;
    title: string;
    date: string;
};

// TODO JACOB: replace with real posts once /blog exists
const posts: BlogPost[] = [
    {
        slug: 'slug1',
        title: 'Title1',
        date: 'Sep 2, 2026',
    },
    {
        slug: 'slug2',
        title: 'Rating every 3d mario game box art',
        date: 'Aug 19, 2026',
    },
    {
        slug: 'slug3',
        title: 'Pokemon black review',
        date: 'Jul 30, 2026',
    },
];

export const BlogStrip: React.FC = () => {
    return (
        <section className="blog-strip-section">
            <div className="blog-strip">
                <a className="blog-strip-header" href="/blog">
                    <span className="blog-strip-title">Blog</span>
                    <span className="blog-strip-all">All posts &rarr;</span>
                </a>
                <div className="blog-strip-posts">
                    {posts.map((post, i) => (
                        <a
                            key={post.slug}
                            className={i === 0 ? 'blog-post blog-post-featured' : 'blog-post'}
                            href={`/blog/${post.slug}`}
                        >
                            <span className="blog-post-date">{post.date}</span>
                            <span className="blog-post-title">{post.title}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
