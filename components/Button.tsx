import React from "react";

interface ButtonTypes {
	children: React.ReactNode;
	className: string;
	type: "button" | "reset" | "submit" | undefined;
	tabIndex?: number;
	handleClick?: () => void;
}

const Button = ({
	children,
	className,
	type,
	tabIndex,
	handleClick,
}: ButtonTypes) => {
	return (
		<div>
			<button
				tabIndex={tabIndex}
				onClick={handleClick}
				type={type}
				className={`${className} cursor-pointer`}>
				{children}
			</button>
		</div>
	);
};

export default Button;
