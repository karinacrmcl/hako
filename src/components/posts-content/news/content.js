import React, { useState } from "react";
// import ReactPlayer from "react-player";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { FacebookShareButton } from "react-share";
import SvgSelector from "../svg-selector";

export default function Content({ object }) {
  let n =
    object.media.length == 1
      ? "auto"
      : object.media.length == 2
      ? 2
      : object.media.length == 3
      ? 3
      : null;

  let srcLinkLine = object.srcLink.split("").slice(0, 30).join("");

  const [fbIsHovered, setfbIsHovered] = useState(false);
  const [msIsHovered, setmsIsHovered] = useState(false);
  const [twIsHovered, settwIsHovered] = useState(false);

  return (
    <div className="font-fontbasic text-primary  flex flex-col w-full px-4">
      <h2 className="font-semibold text-xl mt-4 text-contentbreaks lptpXS:text-base">
        {object.newsTitle}
      </h2>
      <span className="text-sm font-medium lptpXS:text-xs">
        {object.updated}
      </span>
      <span className="text-xs mt-1 italic">{object.author}</span>
      <hr className="mt-4 bg-gray-light border-transparent h-0.5 bg-gradient-to-r from-gradient-from to-gradient-to " />
      <p className="text-sm font-regular mt-4 text-contentbreaks lptpXS:text-xs">
        {object.text}
      </p>
      <div className="relative flex justify-center w-full mt-4 mb-4">
        <div className={`grid grid-cols-${n} w-full gap-2 `}>
          {object.media.map((img) => {
            return (
              <Zoom transitionDuration={200} key={img.data.id}>
                <img
                  className="w-full object-cover h-60 lptpXS:h-52"
                  src={img.data.url}
                />
              </Zoom>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex text-sm">
          <p className="mr-2 lptpXS:text-xs">From the source: </p>
          <a className="font-semibold lptpXS:text-xs" href={object.srcLink}>
            {srcLinkLine}...
          </a>
        </div>
        <div className="flex w-20 justify-between mb-2 mt-2">
          <a
            onMouseEnter={() => {
              setfbIsHovered(true);
            }}
            onMouseLeave={() => {
              setfbIsHovered(false);
            }}
            href={`https://www.facebook.com/sharer/sharer.php?u=${object.srcLink}`}
            target="_blank"
          >
            {fbIsHovered ? (
              <SvgSelector id="fb-active" />
            ) : (
              <SvgSelector id="fb" />
            )}
          </a>
          <a
            className="cursor-pointer"
            onMouseEnter={() => {
              setmsIsHovered(true);
            }}
            onMouseLeave={() => {
              setmsIsHovered(false);
            }}
            href={`fb-messenger://share/?link=http://${object.srcLink}&app_id=ok`}
            target="_blank"
          >
            {msIsHovered ? (
              <SvgSelector id="ms-active" />
            ) : (
              <SvgSelector id="ms" />
            )}
          </a>
          <a
            className="cursor-pointer"
            onMouseEnter={() => {
              settwIsHovered(true);
            }}
            onMouseLeave={() => {
              settwIsHovered(false);
            }}
            href={`https://twitter.com/intent/tweet?url=${object.srcLink})?>`}
          >
            {twIsHovered ? (
              <SvgSelector id="tw-active" />
            ) : (
              <SvgSelector id="tw" />
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
