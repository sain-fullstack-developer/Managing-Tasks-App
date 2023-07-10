import React from "react";

interface ButtonTypes {
	children: React.ReactNode;
	className: string;
	type: "button" | "reset" | "submit" | undefined;
	handleClick?: () => void;
}

const Button = ({ children, className, type, handleClick }: ButtonTypes) => {
	return (
		<div>
			<button
				onClick={handleClick}
				type={type}
				className={`${className} cursor-pointer`}>
				{children}
			</button>
		</div>
	);
};

export default Button;
