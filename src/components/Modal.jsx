import { useContext } from "react";
import { McToolsContext } from "../store/mcTools_context.jsx";
import { Content } from "../helpers/content";

export default function Modal({ children }) {
  const { toolTip, handleToolTipClose } = useContext(McToolsContext);
  const data = Content.filter((item) => item.type === toolTip)[0];

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
              {data.example.firstString}
            </p>
            <p>
              {data?.isExample && (
                <span className="example__label">Second String: </span>
              )}
              {data.example.secondString}
            </p>
          </div>
        )}
        <button onClick={() => handleToolTipClose()}>Close</button>
      </div>
    </div>
  );
}
