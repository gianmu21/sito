import ReactMarkdown from "react-markdown";

export default function Markdown({ source }: { source: string }) {
  return (
    <div className="prose-legal">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="title-xl mb-12">{children}</h1>,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
