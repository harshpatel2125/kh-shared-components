import React from "react";
import Subtitle from "./Subtitle";

interface TitleCardProps {
	title?: string;
	children: any;
	topMargin?: string;
	TopSideButtons?: any;
	hideDivider?: boolean;
}

const TitleCard: React.FC<TitleCardProps> = ({
	title,
	children,
	topMargin,
	TopSideButtons,
	hideDivider,
}) => {
	return (
		<div className={"card w-full p-6 " + (topMargin || "mt-6")}>
			{/* Title for Card */}
			<Subtitle styleClass={TopSideButtons ? "inline-block" : "text-[#48a4f9] pl-3"}>
				{title}

				{/* Top side button, show only if present */}
				{TopSideButtons && (
					<div className="inline-block float-right">{TopSideButtons}</div>
				)}
			</Subtitle>
			{!hideDivider ? (
				<div className="divider mt-2"></div>
			) : (
				<div className="mt-5"></div>
			)}
			{/** Card Body */}
			<div className="h-full w-full pb-6 ">{children}</div>
		</div>
	);
};

export default TitleCard;
