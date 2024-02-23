/* eslint-disable react/no-children-prop */
import Markdown from "react-markdown";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism";
SyntaxHighlighter.registerLanguage("js", js);

import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import Image from "next/image";

export default function PostContent({ post }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const markdown = `${post.content}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />

      <Markdown
        children={markdown}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={prism}
              />
            ) : (
              <>
                <code {...rest} className={className}>
                  {children}
                </code>
              </>
            );
          },

          p: (paragraph) => {
            const { node } = paragraph;

            if (node.children[0].tagName === "img") {
              const image = node.children[0];
              const metastring = image.properties.alt;
              const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
              const metaWidth = metastring.match(/{([^}]+)x/);
              const metaHeight = metastring.match(/x([^}]+)}/);
              const width = metaWidth ? metaWidth[1] : "600";
              const height = metaHeight ? metaHeight[1] : "300";
              const isPriority = metastring?.toLowerCase().match("{priority}");
              const hasCaption = metastring
                ?.toLowerCase()
                .includes("{caption:");
              const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

              return (
                <div className="postImgWrapper">
                  <Image
                    src={`/images/posts/${post.slug}/${image.properties.src}`}
                    width={width}
                    height={height}
                    className={classes.image}
                    alt={alt}
                    priority={isPriority}
                  />
                  {hasCaption ? (
                    <div className="caption" aria-label={caption}>
                      {caption}
                    </div>
                  ) : null}
                </div>
              );
            }
            return <p>{paragraph.children}</p>;
          },
        }}
      />
    </article>
  );
}
