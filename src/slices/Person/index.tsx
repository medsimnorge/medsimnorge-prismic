import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Person`.
 */
export type PersonProps = SliceComponentProps<Content.PersonSlice>;

/**
 * Component for "Person" Slices.
 */
const Person: FC<PersonProps> = ({ slice }) => {
  return (
    <Bounded as="div" className="bg-white leading-relaxed w-full" yPadding="sm">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
        {/* Image - left side on desktop, top on mobile */}
        <div className="flex justify-center md:justify-start">
          <PrismicNextImage 
            field={slice.primary.image} 
            height={150} 
            width={150} 
            className="object-cover rounded-lg shadow-md" 
          />
        </div>
        
        {/* Content - right side on desktop, bottom on mobile */}
        <div className="space-y-3">
          <Heading as="h3" size="sm">
            {slice.primary.name}
          </Heading>
          {slice.primary.job_title && (
            <p className="text-sm text-gray-600 font-medium">
              {slice.primary.job_title}
            </p>
          )}
          <PrismicRichText field={slice.primary.description} />
        </div>
      </div>
    </Bounded>
  )
};

export default Person;