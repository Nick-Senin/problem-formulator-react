import { useRef, useEffect, useState, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./MarkdownPane.css";

export const MARKDOWN_MODE = "MARKDOWN_MODE";
export const RAW_MODE = "RAW_MODE";

export const MarkdownPane = ({
  getContent,
  recivedContent,
  renderMode,
  height,
  width
}) => {
  const [markdownContent, setMarkdowncontent] = useState(recivedContent);
  const [scrollPosition, setScrollPosition] = useState(0);

  const rawPane = useRef("");
  const markdownPane = useRef("");

  useEffect(()=>{
    setMarkdowncontent(recivedContent); 
  }, [recivedContent]); 

  useEffect(() => {
    if (renderMode === MARKDOWN_MODE) {
      markdownPane.current.scrollTop = scrollPosition;
    }
    if (renderMode === RAW_MODE) {
      rawPane.current.scrollTop = scrollPosition;
    }
  }, [renderMode]);

  function onPaneChange(event) {
    setMarkdowncontent(event.target.value);
    if (getContent) getContent(markdownContent);
  }

  function onScroll(event) {
    setScrollPosition(event.target.scrollTop);
  }

  return (
    <Fragment>
      {renderMode === MARKDOWN_MODE ? (
        <div
          className="markdown-pane"
          style={{
            width: '100%' 
          }}
          onScroll={onScroll}
          ref={markdownPane}
        >
          <ReactMarkdown
            children={markdownContent}
            rehypePlugins={[rehypeRaw]}
          />
        </div>
      ) : (
        <textarea
          style={{
            width: '100%' ,
            backgroundColor: "#4E4E4E"
          }}
          className={"markdown-pane raw-input"}
          value={markdownContent}
          onScroll={onScroll}
          onChange={onPaneChange}
          ref={rawPane}
        />
      )}
    </Fragment>
  );
};