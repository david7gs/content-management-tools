import { useContext, useState } from "react";
import { McToolsContext } from "../store/mcTools_context.jsx";
import { Content } from "../helpers/content";

export default function Modal({ children }) {
  const { toolTip, handleToolTipClose } = useContext(McToolsContext);
  const data = Content.filter((item) => item.type === toolTip)[0];

  function CopyButton({ textToCopy, className }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      if (!textToCopy) return;
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset status after 2s
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    return (
      <button
        className={className}
        onClick={() => handleCopy(data.firstInputArr)}
      >
        {copied ? "Copied!" : "Copy String"}
      </button>
    );
  }

  function handleModalClose(e) {
    if (e.target.classList.contains("modal__background")) {
      handleToolTipClose();
    }
  }

  return (
    <div className="modal__background onClick" onClick={handleModalClose}>
      <div className="tool-tip__modal scroll">
        {data.desc.map((item, i) => {
          return <p key={i}>{item}</p>;
        })}
        {data?.img &&
          data.img.map((img, i) => {
            return (
              <div className="modal-img">
                <img src={img.path} />
                <p>{img.caption}</p>
              </div>
            );
          })}
        {data?.example && (
          <div className="example">
            <h4>Example:</h4>
            <p>
              {data?.isExample && (
                <span className="example__label">First String: </span>
              )}
              <span className="text">{data.example.firstString}</span>
            </p>
            {data.example?.firstStringText && (
              <CopyButton
                className="select copy-string"
                textToCopy={data.example.firstStringText}
              />
            )}
            <p>
              {data?.isExample && (
                <span className="example__label">Second String: </span>
              )}
              <span className="text">{data.example.secondString}</span>
            </p>
            {data.example?.firstStringText && (
              <CopyButton
                className="select copy-string"
                textToCopy={data.example.secondStringText}
              />
            )}
          </div>
        )}
        <button
          className="modal-close select"
          onClick={() => handleToolTipClose()}
        >
          Close
        </button>
      </div>
    </div>
  );
}
