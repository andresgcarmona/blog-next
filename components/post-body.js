import ReactMarkdown from 'react-markdown/with-html'
import { Prism as SyntaxHighlighter } from'react-syntax-highlighter/dist/cjs/index'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language} style={dracula}>{value}</SyntaxHighlighter>
};

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown
        escapeHtml={false}
        source={content}
        renderers={{ code: CodeBlock }}
      />
    </div>
  )
}
