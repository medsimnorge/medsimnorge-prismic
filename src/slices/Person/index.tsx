import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";
import {Card, CardHeader, CardBody} from "@heroui/card";
/**
 * Props for `Person`.
 */
export type PersonProps = SliceComponentProps<Content.PersonSlice>;

/**
 * Component for "Person" Slices.
 */
const Person: FC<PersonProps> = ({ slice }) => {
  return (
    <Bounded as="div" className="bg-white leading-relaxed max-h-36" yPadding="sm">
      <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <PrismicNextImage field={slice.primary.image} height={150} width={slice.primary.image.dimensions?.width} className="object-cover rounded" />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Heading as="h3" size="sm">
          {slice.primary.name}
        </Heading>
        <PrismicRichText field={slice.primary.description} />
      </CardBody>
    </Card>
    </Bounded>
  )
};

export default Person;