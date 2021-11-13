import PropTypes from "prop-types";

export default function Image({ src, caption }) {
  return <img src={src} alt={caption} className="w-auto h-full " />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
