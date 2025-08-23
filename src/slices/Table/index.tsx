import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicTable, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import clsx from "clsx";

/**
 * Props for `Table`.
 */
export type TableProps = SliceComponentProps<Content.TableSlice>;

/**
 * Component for "Table" Slices.
 */
const Table: FC<TableProps> = ({ slice }) => {
  return (
    <Bounded as="div" className="bg-white leading-relaxed" yPadding="sm">
      <div className="prismic-table">
        <PrismicTable field={slice.primary.table} />
      </div>
    </Bounded>
  );
};

export default Table;
