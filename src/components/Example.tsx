/**
 * Displays a list of threads, along with a composer for creating
 * new threads.
 */
import { useThreads } from "../../liveblocks.config";
import { Composer, Thread, ThreadProps } from "@liveblocks/react-comments";
import { useState } from "react";

const threadProps: Record<string, Omit<ThreadProps,"thread">> = {
  one: {},
  two: {
    indentCommentContent: false,
    showActions: true,

    showDeletedComments: true,
    overrides: {
      COMPOSER_SEND: "Reply",
      THREAD_COMPOSER_PLACEHOLDER: "Leave your thoughts"
    }
  },
  three: {
    showComposer: true,
    showReactions: false,
    indentCommentContent: false,
    overrides: {
      THREAD_COMPOSER_PLACEHOLDER: "Make a reply..."
    }
  },
  four: {
    showActions: true,
    showResolveAction: false,
    overrides: {
      THREAD_COMPOSER_PLACEHOLDER: "Say something fun!"
    }
  }
}

// Look inside `/src/styles/example.css` for the custom styles
export function Example() {
  const [exampleStyle, setExampleStyle] = useState("one")
  const { threads } = useThreads();

  return (
    <main className="example" data-style={exampleStyle} data-theme={exampleStyle === "two" || exampleStyle === "four" ? "dark" : "light"}>
      <div className="tabs">
        <button onClick={() => setExampleStyle("one")} data-active={exampleStyle === "one"}>Modern</button>
        <button onClick={() => setExampleStyle("two")} data-active={exampleStyle === "two"}>Tech</button>
        <button onClick={() => setExampleStyle("three")} data-active={exampleStyle === "three"}>Classic</button>
        <button onClick={() => setExampleStyle("four")} data-active={exampleStyle === "four"}>Fun</button>
      </div>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} className="thread" {...threadProps[exampleStyle]} />
      ))}
      <Composer className="composer" />
    </main>
  );
}
