import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";

/**
 * Props for `VideoViewer`.
 */
export type VideoViewerProps = SliceComponentProps<Content.VideoViewerSlice>;

/**
 * Component for "VideoViewer" Slices.
 */
const VideoViewer: FC<VideoViewerProps> = ({ slice }) => {
  if (!slice.primary.video?.html) {
    return null;
  }

  return (
    <Bounded as="section" className="bg-white leading-relaxed" yPadding="sm">
      <div dangerouslySetInnerHTML={{ __html: slice.primary.video.html }} />
    </Bounded>
  );
};

export default VideoViewer;